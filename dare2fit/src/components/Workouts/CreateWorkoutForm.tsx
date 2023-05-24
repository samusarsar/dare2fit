import { FC } from 'react';

import { Heading, Box, Stack, Button, useColorModeValue, VStack, FormControl, FormLabel, FormErrorMessage, Input, Grid, Select, Textarea } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { WORKOUT_NAME_MAX_LENGTH, WORKOUT_NAME_MIN_LENGTH } from '../../common/constants';

const CreateWorkoutForm: FC = () => {

    const validateWorkoutName = (value: string) => {
        let error;
        if (!value) {
            error = 'Required';
        } else if (value.length < WORKOUT_NAME_MIN_LENGTH || value.length > WORKOUT_NAME_MAX_LENGTH) {
            error = `Workout name must be betweeen ${WORKOUT_NAME_MIN_LENGTH} and ${WORKOUT_NAME_MAX_LENGTH} symbols`;
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
                        initialValues={{
                            workoutName: '',
                            category: '',
                            duration: '',
                            difficulty: '',
                            calories: '',
                            instructions: '',
                            exercises: {},
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            console.log(values);
                            setSubmitting(false);
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                        }) => (
                            <Form>
                                <VStack>
                                    <Field id='workoutName' name='workoutName' validate={validateWorkoutName} isRequired>
                                        {({ field, form }) => (
                                            <FormControl isRequired isInvalid={form.errors.workoutName && form.touched.workoutName}>
                                                <FormLabel htmlFor='workoutName'>Workout Name</FormLabel>
                                                <Input {...field} placeholder='Workout Name' />
                                                <FormErrorMessage>{form.errors.workoutName}</FormErrorMessage>
                                            </FormControl>
                                        )
                                        }
                                    </Field>

                                    <Grid templateColumns='repeat(4, 1fr)' gap={2}>

                                        <Field id='category' name='category' validate={validateCategory} isRequired>
                                            {({ field, form }) => (
                                                <FormControl isRequired isInvalid={form.errors.category && form.touched.category}>
                                                    <FormLabel htmlFor='category'>Category</FormLabel>
                                                    <Input placeholder='select category' as={Select} {...field}>
                                                        <option value='strength'>Strength</option>
                                                        <option value='stamina'>Stamina</option>
                                                        <option value='stretching'>Stretching</option>
                                                    </Input>
                                                    <FormErrorMessage>{form.errors.workoutName}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>

                                        <Field id='difficulty' name='difficulty'>
                                            {({ field }) => (
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
                                            {({ field }) => (
                                                <FormControl>
                                                    <FormLabel htmlFor='duration'>Duration</FormLabel>
                                                    <Input placeholder='in minutes' {...field}>
                                                    </Input>
                                                </FormControl>
                                            )}
                                        </Field>

                                        <Field id='calories' name='calories'>
                                            {({ field }) => (
                                                <FormControl>
                                                    <FormLabel htmlFor='calories'>Calories</FormLabel>
                                                    <Input placeholder='in kcal' {...field}>
                                                    </Input>
                                                </FormControl>
                                            )}
                                        </Field>
                                    </Grid>

                                    <Field id='instructions' name='instructions'>
                                        {({ field }) => (
                                            <FormControl>
                                                <FormLabel htmlFor='instructions'>Instructions</FormLabel>
                                                <Input as={Textarea} placeholder='additional instructions' {...field}>
                                                </Input>
                                            </FormControl>
                                        )}
                                    </Field>

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

                </Stack>
            </Box>
        </Box>
    );
};

export default CreateWorkoutForm;
