import { FC, useContext, useEffect, useState } from 'react';

import { Accordion, Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Text } from '@chakra-ui/react';
import SingleExercise from '../../Exercises/SingleExercise/SingleExercise';
import { IWorkout } from '../../../common/types';
import { AppContext } from '../../../context/AppContext/AppContext';
import OptionsButton from '../../Base/OptionsButton/OptionsButton';
import { useNavigate } from 'react-router';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../config/firebase-config';


const WorkoutDetails: FC<{ workout: IWorkout }> = ({ workout }) => {
    const { userData } = useContext(AppContext);

    const [currWorkout, setCurrWorkout] = useState(workout);

    const navigate = useNavigate();

    useEffect(() => {
        return onValue(ref(db, `workouts/${workout.workoutId}`), (snapshot) => {
            setCurrWorkout(snapshot.val());
        });
    }, [workout]);

    if (currWorkout) {
        return (
            <Box position='relative' boxShadow='xl' maxW='380px'>
                <OptionsButton workout={currWorkout} />
                <Card minW={{ base: '2xs', md: '380px' }}>
                    <CardHeader>
                        <Heading size='md'>{currWorkout.workoutName}</Heading>
                        {currWorkout.author !== userData!.handle && (
                            <Text _hover={{ cursor: 'pointer' }} onClick={() => navigate(`../../profile/${currWorkout.author}`)}> by {currWorkout.author}</Text>
                        )}

                        <Flex gap={2} my={1} wrap='wrap'>
                            {currWorkout.category && (<Badge colorScheme='red'>{currWorkout.category}</Badge>)}
                            {currWorkout.difficulty && (<Badge colorScheme='yellow'>{currWorkout.difficulty}</Badge>)}
                            {currWorkout.duration && (<Badge colorScheme='green'>{currWorkout.duration} min</Badge>)}
                            {currWorkout.calories && (<Badge colorScheme='purple'>{currWorkout.calories} kcal</Badge>)}
                        </Flex>

                    </CardHeader>
                    <CardBody>
                        <Accordion allowMultiple>
                            {currWorkout.exercises.length ? (
                                currWorkout.exercises.map(e => (
                                    <SingleExercise key={e.name} exercise={e}>
                                        <>
                                            <Badge>{e.sets ? `${e.sets} X` : ''} {e.quantity} {e.quantity === 1 ? e.units.slice(0, -1) : e.units}</Badge>
                                        </>
                                    </SingleExercise>
                                ))
                            ) : (
                                <Text>To add exercises search below</Text>
                            )}
                        </Accordion>
                        {currWorkout.instructions && (<Text fontStyle='italic' pt={5}>{currWorkout.instructions}</Text>)}
                    </CardBody>
                </Card >
            </Box>
        );
    }

    return null;
};

export default WorkoutDetails;
