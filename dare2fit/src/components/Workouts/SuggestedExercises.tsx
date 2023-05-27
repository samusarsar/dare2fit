import { Dispatch, FC, SetStateAction } from 'react';
import { IWorkoutExercise, ISuggestedExercise } from '../../common/types';
// eslint-disable-next-line max-len
import { Accordion, Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react';

import SingleSuggestedExercise from './SingleSuggestedExercise';

interface ISuggestedExercisesProps {
    suggestedExercises: ISuggestedExercise[] | [] | null,
    workoutExercises: IWorkoutExercise[] | [],
    setWorkoutExercises: Dispatch<SetStateAction<IWorkoutExercise[] | []>>
}

const SuggestedExercises: FC<ISuggestedExercisesProps> = ({ suggestedExercises, workoutExercises, setWorkoutExercises }) => {

    if (suggestedExercises === null) {
        return (
            <>
                <Heading fontSize={'xl'} fontWeight={500} fontFamily={'body'}>
                    Search for Exercises
                </Heading>
                <Text fontStyle='italic' color={'gray.200'}>access a comprehensive list of thousands of exercises targeting every major muscle group</Text>
            </>
        );
    }
    if (suggestedExercises.length === 0) {
        return (
            <Text>No exercises match the searching criteria</Text>
        );
    }
    return (
        <Card>
            <CardHeader>
                <Heading size='md'>Suggested Exercises</Heading>
            </CardHeader>
            <CardBody>
                <Accordion allowMultiple>
                    {suggestedExercises.map(e => (
                        <SingleSuggestedExercise
                            key={e.name}
                            exercise={e}
                            workoutExercises={workoutExercises}
                            setWorkoutExercises={setWorkoutExercises} />
                    ))}
                </Accordion>
            </CardBody>
        </Card >
    );
};

export default SuggestedExercises;
