import { FC, useContext, useState } from 'react';

// eslint-disable-next-line max-len
import { Heading, Box, Button, VStack, FormControl, FormLabel, FormErrorMessage, Input, Grid, Select, Textarea, Card, CardHeader, CardBody, Accordion, Text, IconButton, Badge, useToast, useColorModeValue } from '@chakra-ui/react';
import { IoMdRemove } from 'react-icons/io';
import { Formik, Field, FormikHelpers } from 'formik';
import { WORKOUT_NAME_MAX_LENGTH, WORKOUT_NAME_MIN_LENGTH } from '../../../common/constants';
import SelectExercisesForm from '../../Exercises/SelectExercisesForm/SelectExercisesForm';
import { IWorkout, IWorkoutExercise, IWorkoutFormValues } from '../../../common/types';
import SingleExercise from '../../Exercises/SingleExercise/SingleExercise';
import { addWorkout, editWorkout } from '../../../services/workout.services';
import { AppContext } from '../../../context/AppContext/AppContext';
import { useLocation, useNavigate } from 'react-router';

const WorkoutForm: FC<{ workout?: IWorkout, onClose?: () => void }> = ({ workout, onClose }) => {
    const { userData } = useContext(AppContext);

    const [workoutExercises, setWorkoutExercises] = useState<IWorkoutExercise[] | []>(workout?.exercises || []);

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const boxProps = (!workout) ? {
        p: { base: 3, sm: 6 },
        bg: useColorModeValue('brand.white', 'brand.grey'),
        boxShadow: '2xl',
        rounded: 'md',
        w: { base: '100%', lg: '80%' },
    } : {};

    const toast = useToast();

    const initialValues: IWorkoutFormValues = {
        workoutName: workout ? workout.workoutName : '',
        category: workout ? workout.category : '',
        duration: workout ? workout.duration : '',
        difficulty: workout ? workout.difficulty : '',
        calories: workout ? workout.calories : '',
        instructions: workout ? workout.instructions : '',
        exercises: workout ? workout.exercises : [],
    };

    const handleRemoveExercise = (exercise: IWorkoutExercise) => {
        setWorkoutExercises(workoutExercises.filter(ex => ex.name !== exercise.name));
    };

    const handleCreate = (values: IWorkoutFormValues, { setSubmitting }: FormikHelpers<IWorkoutFormValues>) => {
        const workoutToCreate = {
            ...values,
            exercises: workoutExercises,
            author: userData?.handle,
        };

        if (!workoutToCreate.duration) {
            delete workoutToCreate.duration;
        }
        if (!workoutToCreate.calories) {
            delete workoutToCreate.calories;
        }
        if (!workoutToCreate.instructions) {
            delete workoutToCreate.instructions;
        }

        if (!workout) {
            addWorkout(workoutToCreate, userData!.handle)
                .then(() => navigate('../../workouts'))
                .then(() => setSubmitting(false))
                .then(() => toast({
                    title: 'Workout created successfully!',
                    description: 'You have created your workout.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                    variant: 'subtle',
                }))
                .catch(() => toast({
                    title: 'Error creating workout!',
                    description: 'Please try again later.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                    variant: 'subtle',
                }));
        } else {
            editWorkout(workoutToCreate, workout.workoutId)
                .then(() => onClose && onClose())
                .then(() => setSubmitting(false))
                .then(() => toast({
                    title: 'Workout edited successfully!',
                    description: 'You have edited your workout.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                    variant: 'subtle',
                }))
                .catch(() => toast({
                    title: 'Error editing workout!',
                    description: 'Please try again later.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                    variant: 'subtle',
                }));
        }
    };

    const validateWorkoutName = (value: string) => {
        let error;
        if (!value) {
            error = 'Required';
        } else if (value.length < WORKOUT_NAME_MIN_LENGTH || value.length > WORKOUT_NAME_MAX_LENGTH) {
            error = `Workout name must be between ${WORKOUT_NAME_MIN_LENGTH} and ${WORKOUT_NAME_MAX_LENGTH} symbols`;
        }
        return error;
    };

    const validateCategory = (value: string) => {
        let error;
        if (!value) {
            error = 'Required';
        }
        return error;
    };

    const validatePositiveNumber = (value: string) => {
        let error;
        if (value === '') return error;
        if (!Number(value) || Number(value) <= 0) {
            error = 'Please provide a positive number';
        }
        return error;
    };

    return (
        <Box {...boxProps}>
            <Formik
                initialValues={initialValues}
                onSubmit={handleCreate}
            >
                {({
                    handleSubmit,
                    errors,
                    touched,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <VStack>
                            {pathname === '/workouts/create' &&
                                    <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'} mb={4}>
                                        Create Workout
                                    </Heading>}

                            <FormControl isRequired isInvalid={!!errors.workoutName && touched.workoutName}>
                                <FormLabel htmlFor='workoutName'>Workout Name</FormLabel>
                                <Field
                                    validate={validateWorkoutName}
                                    id='workoutName'
                                    name="workoutName"
                                    as={Input}
                                    placeholder='Workout Name' />
                                <FormErrorMessage>{errors.workoutName}</FormErrorMessage>
                            </FormControl>


                            <Grid templateColumns='repeat(auto-fit, minmax(130px, 1fr))' gap={2} w='100%'>

                                <FormControl isRequired isInvalid={!!errors.category && touched.category}>
                                    <FormLabel htmlFor='category'>Category</FormLabel>
                                    <Field
                                        validate={validateCategory}
                                        id='category'
                                        name="category"
                                        as={Select}
                                        placeholder='select category'>
                                        <option value='strength'>Strength</option>
                                        <option value='stamina'>Stamina</option>
                                        <option value='stretching'>Stretching</option>
                                    </Field>
                                    <FormErrorMessage>{errors.category}</FormErrorMessage>
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel htmlFor='difficulty'>Difficulty</FormLabel>
                                    <Field
                                        id='difficulty'
                                        name="difficulty"
                                        as={Select}
                                        placeholder='select difficulty'>
                                        <option value='beginner'>Beginner</option>
                                        <option value='intermediate'>Intermediate</option>
                                        <option value='advanced'>Advanced</option>
                                    </Field>
                                </FormControl>

                                <FormControl isInvalid={!!errors.duration}>
                                    <FormLabel htmlFor='duration'>Duration</FormLabel>
                                    <Field
                                        validate={validatePositiveNumber}
                                        id='duration'
                                        name="duration"
                                        as={Input}
                                        placeholder='in minutes' />
                                    <FormErrorMessage>{errors.duration}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={!!errors.calories}>
                                    <FormLabel htmlFor='calories'>Calories</FormLabel>
                                    <Field
                                        validate={validatePositiveNumber}
                                        id='calories'
                                        name="calories"
                                        as={Input}
                                        placeholder='in kcal' />
                                    <FormErrorMessage>{errors.calories}</FormErrorMessage>
                                </FormControl>

                            </Grid>

                            <FormControl>
                                <FormLabel htmlFor='instructions'>Instructions</FormLabel>
                                <Field
                                    id='instructions'
                                    name="instructions"
                                    as={Textarea}
                                    placeholder='additional instructions' />
                            </FormControl>

                            <Card width={{ base: '100%', sm: 'lg' }}>
                                <CardHeader>
                                    <Heading size='md'>Added Exercises</Heading>
                                </CardHeader>
                                <CardBody>
                                    <Accordion allowMultiple>
                                        {workoutExercises.length ? (
                                            workoutExercises.map(e => (
                                                <SingleExercise key={e.name} exercise={e}>
                                                    <>
                                                        <Badge>{e.sets ? `${e.sets} X` : ''} {e.quantity} {e.quantity === 1 ? e.units.slice(0, -1) : e.units}</Badge>
                                                        <IconButton
                                                            onClick={() => handleRemoveExercise(e)}
                                                            size='xs'
                                                            colorScheme='red'
                                                            aria-label='remove exercise'
                                                            icon={<IoMdRemove />} />

                                                    </>
                                                </SingleExercise>
                                            ))
                                        ) : (
                                            <Text>To add exercises search below</Text>
                                        )}
                                    </Accordion>
                                </CardBody>
                            </Card >
                        </VStack>


                        <Button
                            type='submit'
                            isDisabled={isSubmitting || !workoutExercises.length}
                            w={'full'}
                            my={8}
                            bg='brand.purple'
                            color={'white'}
                            rounded={'md'}
                            _hover={{
                                transform: 'translateY(-1px)',
                                boxShadow: 'lg',
                            }}>
                            {workout ? 'Edit' : 'Create'} Workout
                        </Button>

                    </form>
                )}
            </Formik>
            <SelectExercisesForm workoutExercises={workoutExercises} setWorkoutExercises={setWorkoutExercises} />
        </Box>
    );
};

export default WorkoutForm;
