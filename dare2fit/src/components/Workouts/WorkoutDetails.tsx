import { FC, useContext } from 'react';

import { Accordion, Badge, Card, CardBody, CardHeader, Flex, Heading, Text } from '@chakra-ui/react';
import SingleExercise from '../Exercises/SingleExercise/SingleExercise';
import { IWorkout } from '../../common/types';
import { AppContext } from '../../context/AppContext/AppContext';


const WorkoutDetails: FC<{ workout: IWorkout }> = ({ workout }) => {
    const { userData } = useContext(AppContext);

    return (
        <Card width='sm' minW='3xs'>
            <CardHeader>
                <Heading size='md'>{workout.workoutName}</Heading>
                {workout.author !== userData!.handle && (
                    <Text> by {workout.author}</Text>
                )}

                <Flex gap={2} my={1} wrap='wrap'>
                    {workout.category && (<Badge colorScheme='red'>{workout.category}</Badge>)}
                    {workout.difficulty && (<Badge colorScheme='yellow'>{workout.difficulty}</Badge>)}
                    {workout.duration && (<Badge colorScheme='green'>{workout.duration} min</Badge>)}
                    {workout.calories && (<Badge colorScheme='purple'>{workout.calories} kcal</Badge>)}
                </Flex>

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
                {workout.instructions && (<Text fontStyle='italic' pt={5}>{workout.instructions}</Text>)}
            </CardBody>
        </Card >
    );
};

export default WorkoutDetails;
