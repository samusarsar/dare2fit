import { FC, useContext, useState } from 'react';

// eslint-disable-next-line max-len
import { Heading, Box, Stack, Button, useColorModeValue, VStack, FormControl, FormLabel, FormErrorMessage, Input, Grid, Select, Textarea, Card, CardHeader, CardBody, Accordion, Text, IconButton, Badge } from '@chakra-ui/react';
import { IoMdRemove } from 'react-icons/io';
import { Formik, Form, Field, FormikProps, FormikHelpers, FormikState, FieldProps } from 'formik';
import { WORKOUT_NAME_MAX_LENGTH, WORKOUT_NAME_MIN_LENGTH } from '../../common/constants';
import SelectExercisesForm from './SelectExercisesForm';
import { IWorkoutExercise, IWorkoutFormValues } from '../../common/types';
import SingleExercise from './SigleExercise';
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

    const handleSubmit = (values: IWorkoutFormValues, { setSubmitting }: FormikHelpers<IWorkoutFormValues>) => {
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

        addWorkout(workout, userData?.handle);
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
                        onSubmit={handleSubmit}
                    >
                        {({
                            // values,
                            // touched,
                            // handleChange,
                            // handleBlur,
                            // handleSubmit,
                            isSubmitting,
                        }) => (
                            <Form>
                                <VStack>
                                    <Field id='workoutName' name='workoutName' validate={validateWorkoutName} isRequired>
                                        {({ field, form }: FieldProps<string, FormikProps<IWorkoutFormValues>>) => {
                                            // console.log(form);
                                            return (
                                                <FormControl isRequired isInvalid={form.errors.workoutName && form.touched.workoutName}>
                                                    <FormLabel htmlFor='workoutName'>Workout Name</FormLabel>
                                                    <Input {...field} placeholder='Workout Name' />
                                                    <FormErrorMessage>{form.errors.workoutName}</FormErrorMessage>
                                                </FormControl>
                                            );
                                        }
                                        }
                                    </Field>

                                    <Grid templateColumns='repeat(4, 1fr)' gap={2}>

                                        <Field id='category' name='category' validate={validateCategory} isRequired>
                                            {({ field, form }: FieldProps<string, FormikProps<IWorkoutFormValues>>) => (
                                                <FormControl isRequired isInvalid={form.errors.category && form.touched.category}>
                                                    <FormLabel htmlFor='category'>Category</FormLabel>
                                                    <Input placeholder='select category' as={Select} {...field}>
                                                        <option value='strength'>Strength</option>
                                                        <option value='stamina'>Stamina</option>
                                                        <option value='stretching'>Stretching</option>
                                                    </Input>
                                                    <FormErrorMessage>{form.errors.category}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>

                                        <Field id='difficulty' name='difficulty'>
                                            {({ field }: FieldProps<string, FormikProps<IWorkoutFormValues>>) => (
                                                <FormControl>
                                                    <FormLabel htmlFor='difficulty'>Difficulty</FormLabel>
                                                    <Input placeholder='select difficulty' as={Select} {...field}>
                                                        <option value='beginner'>Beginner</option>
                                                        <option value='intermediate'>Intermediate</option>
                                                        <option value='advanced'>Advanced</option>
                                                    </Input>
                                                </FormControl>
                                            )}
                                        </Field>

                                        <Field id='duration' name='duration'>
                                            {({ field }: FieldProps<string, FormikProps<IWorkoutFormValues>>) => (
                                                <FormControl>
                                                    <FormLabel htmlFor='duration'>Duration</FormLabel>
                                                    <Input placeholder='in minutes' {...field}>
                                                    </Input>
                                                </FormControl>
                                            )}
                                        </Field>

                                        <Field id='calories' name='calories'>
                                            {({ field }: FieldProps<string, FormikProps<IWorkoutFormValues>>) => (
                                                <FormControl>
                                                    <FormLabel htmlFor='calories'>Calories</FormLabel>
                                                    <Input placeholder='in kcal' {...field}>
                                                    </Input>
                                                </FormControl>
                                            )}
                                        </Field>
                                    </Grid>

                                    <Field id='instructions' name='instructions'>
                                        {({ field }: FieldProps<string, FormikProps<IWorkoutFormValues>>) => (
                                            <FormControl>
                                                <FormLabel htmlFor='instructions'>Instructions</FormLabel>
                                                <Input as={Textarea} placeholder='additional instructions' {...field}>
                                                </Input>
                                            </FormControl>
                                        )}
                                    </Field>

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

                            </Form>
                        )}
                    </Formik>
                    <SelectExercisesForm workoutExercises={workoutExercises} setWorkoutExercises={setWorkoutExercises} />
                </Stack>
            </Box>
        </Box>
    );
};

export default CreateWorkoutForm;