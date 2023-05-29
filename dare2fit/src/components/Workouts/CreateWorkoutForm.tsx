import { FC, useContext, useState } from 'react';

// eslint-disable-next-line max-len
import { Heading, Box, Stack, Button, useColorModeValue, VStack, FormControl, FormLabel, FormErrorMessage, Input, Grid, Select, Textarea, Card, CardHeader, CardBody, Accordion, Text, IconButton, Badge } from '@chakra-ui/react';
import { IoMdRemove } from 'react-icons/io';
import { Formik, Field, FormikHelpers } from 'formik';
import { WORKOUT_NAME_MAX_LENGTH, WORKOUT_NAME_MIN_LENGTH } from '../../common/constants';
import SelectExercisesForm from '../Exercises/SelectExercisesForm/SelectExercisesForm';
import { IWorkoutExercise, IWorkoutFormValues } from '../../common/types';
import SingleExercise from '../Exercises/SingleExercise/SingleExercise';
import { addWorkout } from '../../services/workout.services';
import { AppContext } from '../../context/AppContext/AppContext';

const CreateWorkoutForm: FC = () => {

    const { userData } = useContext(AppContext);

    const [workoutExercises, setWorkoutExercises] = useState<IWorkoutExercise[] | []>([]);

    const initialValues: IWorkoutFormValues = {
        workoutName: '',
        category: '',
        duration: '',
        difficulty: '',
        calories: '',
        instructions: '',
        exercises: [],
    };

    const handleRemoveExercise = (exercise: IWorkoutExercise) => {
        setWorkoutExercises(workoutExercises.filter(ex => ex.name !== exercise.name));
    };

    const handleCreate = (values: IWorkoutFormValues, { setSubmitting }: FormikHelpers<IWorkoutFormValues>) => {
        const workout = {
            ...values,
            exercises: workoutExercises,
            user: userData?.handle,
        };

        if (!workout.difficulty) {
            delete workout.difficulty;
        }
        if (!workout.duration) {
            delete workout.duration;
        }
        if (!workout.calories) {
            delete workout.calories;
        }
        if (!workout.instructions) {
            delete workout.instructions;
        }

        addWorkout(workout, userData!.handle);
        setSubmitting(false);
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
        <Box
            w='80%'
            bg={useColorModeValue('brand.white', 'brand.grey')}
            boxShadow={'2xl'}
            rounded={'md'}
            overflow={'hidden'}>

            <Box p={6}>
                <Stack spacing={0} align={'center'} mb={5}>
                    <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                        Create Workout
                    </Heading>

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


                                    <Grid templateColumns='repeat(4, 1fr)' gap={2}>

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

                                        <FormControl>
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

                                    <Card width='lg'>
                                        <CardHeader>
                                            <Heading size='md'>Added Exercises</Heading>
                                        </CardHeader>
                                        <CardBody>
                                            <Accordion allowMultiple>
                                                {workoutExercises.length ? (
                                                    workoutExercises.map(e => (
                                                        <SingleExercise key={e.name} exercise={e}>
                                                            <>
                                                                <Badge>{e.quantity} {e.quantity === 1 ? e.units.slice(0, -1) : e.units}</Badge>
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
                                    disabled={isSubmitting}
                                    w={'full'}
                                    mt={8}
                                    bg='brand.purple'
                                    color={'white'}
                                    rounded={'md'}
                                    _hover={{
                                        transform: 'translateY(-1px)',
                                        boxShadow: 'lg',
                                    }}>
                                    Create Workout
                                </Button>

                            </form>
                        )}
                    </Formik>
                    <SelectExercisesForm workoutExercises={workoutExercises} setWorkoutExercises={setWorkoutExercises} />
                </Stack>
            </Box>
        </Box>
    );
};

export default CreateWorkoutForm;
