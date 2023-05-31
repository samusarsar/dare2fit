import { Dispatch, FC, SetStateAction, useState } from 'react';

import { Box, Button, FormLabel, Grid, GridItem, Input, Select, Stack, VStack } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { ExerciseDifficulty, ExerciseMuscle, ExerciseTypes } from '../../../common/enums';
import { IExerciseFormValues, IWorkoutExercise, ISuggestedExercise } from '../../../common/types';
import { findExercises } from '../../../services/exercise.services';
import SuggestedExercises from './SuggestedExercises';

interface ISelectExercisesFormProps {
    workoutExercises: IWorkoutExercise[] | [],
    setWorkoutExercises: Dispatch<SetStateAction<IWorkoutExercise[] | []>>
}

const SelectExercisesForm: FC<ISelectExercisesFormProps> = ( { workoutExercises, setWorkoutExercises }) => {
    const [suggestedExercises, setSuggestedExercises] = useState<ISuggestedExercise[] | [] | null>(null);
    console.log(suggestedExercises);

    const initialValues: IExerciseFormValues = {
        exerciseName: '',
        type: '',
        muscle: '',
        difficulty: '',
    };

    const handelSubmit = (values: IExerciseFormValues) => {
        findExercises(values)
            .then(data => setSuggestedExercises(data))
            .catch(); // TODO
    };


    return (
        <Box
            w='99%'
            mx='auto'
            my={3}
            border='2px solid'
            borderColor={'brand.purple'}
            bg='brand.purple'
            opacity={0.8}
            boxShadow={'xl'}
            rounded={'md'}
            overflow={'hidden'}>

            <SuggestedExercises suggestedExercises={suggestedExercises} workoutExercises={workoutExercises} setWorkoutExercises={setWorkoutExercises} />

            <Box p={6} color={'black'}>
                <Stack spacing={0} align={'center'} mb={5}>

                    <Formik
                        initialValues={initialValues}
                        onSubmit={handelSubmit}
                    >

                        {({
                            isSubmitting,
                        }) => (
                            <Form>
                                <VStack>

                                    <Grid templateColumns='repeat(4, 1fr)' gap={2}>

                                        <GridItem>
                                            <FormLabel htmlFor='exerciseName'>Exercise Name</FormLabel>
                                            <Field as={Input} id='exerciseName' name='exerciseName' />
                                        </GridItem>

                                        <GridItem>
                                            <FormLabel htmlFor='type'>Type</FormLabel>
                                            <Field as={Select} id='type' name='type' placeholder='select type' >
                                                {Object.values(ExerciseTypes).map(type => {
                                                    return (
                                                        <option key={type} value={type.split(' ').join('_')}>{type}</option>
                                                    );
                                                })}
                                            </Field>
                                        </GridItem>

                                        <GridItem>
                                            <FormLabel htmlFor='muscle'>Muscle</FormLabel>
                                            <Field as={Select} id='muscle' name='muscle' placeholder='select muscle' >
                                                {Object.values(ExerciseMuscle).map(muscle => {
                                                    return (
                                                        <option key={muscle} value={muscle.split(' ').join('_')}>{muscle}</option>
                                                    );
                                                })}
                                            </Field>
                                        </GridItem>

                                        <GridItem>
                                            <FormLabel htmlFor='difficulty'>Difficulty</FormLabel>
                                            <Field as={Select} id='difficulty' name='difficulty' placeholder='select difficulty' >
                                                {Object.values(ExerciseDifficulty).map(d => {
                                                    return (
                                                        <option key={d} value={d}>{d}</option>
                                                    );
                                                })}
                                            </Field>
                                        </GridItem>
                                    </Grid>

                                </VStack>

                                <Button
                                    type='submit'
                                    disabled={isSubmitting}
                                    w={'full'}
                                    mt={8}
                                    bg='brand.white'
                                    color='brand.purple'
                                    rounded={'md'}
                                    _hover={{
                                        transform: 'translateY(-1px)',
                                        boxShadow: 'lg',
                                    }}>
                                    Find Exercises
                                </Button>

                            </Form>
                        )}
                    </Formik>
                </Stack>
            </Box>

        </Box>
    );
};

export default SelectExercisesForm;
