import { FC } from 'react';

import { Accordion, Badge, Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react';
import SingleExercise from '../Exercises/SingleExercise/SingleExercise';
import { IWorkout } from '../../common/types';


const WorkoutDetails: FC<{ workout: IWorkout}> = ({ workout }) => {

    return (
        <Card width='sm'>
            <CardHeader>
                <Heading size='md'>{workout.workoutName}</Heading>
            </CardHeader>
            <CardBody>
                <Accordion allowMultiple>
                    {workout.exercises.length ? (
                        workout.exercises.map(e => (
                            <SingleExercise key={e.name} exercise={e}>
                                <>
                                    <Badge>{e.quantity} {e.quantity === 1 ? e.units.slice(0, -1) : e.units}</Badge>
                                </>
                            </SingleExercise>
                        ))
                    ) : (
                        <Text>To add exercises search below</Text>
                    )}
                </Accordion>
            </CardBody>
        </Card >
    );
};

export default WorkoutDetails;
