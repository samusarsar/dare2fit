import { FC, useContext } from 'react';

import { Accordion, Badge, Box, Card, CardBody, CardHeader, Flex, Heading, Text } from '@chakra-ui/react';
import SingleExercise from '../../Exercises/SingleExercise/SingleExercise';
import { IWorkout } from '../../../common/types';
import { AppContext } from '../../../context/AppContext/AppContext';
import OptionsButton from '../../Base/OptionsButton/OptionsButton';
import { useNavigate } from 'react-router';


const WorkoutDetails: FC<{ workout: IWorkout }> = ({ workout }) => {
    const { userData } = useContext(AppContext);

    const navigate = useNavigate();

    return (
        <Box position='relative' boxShadow='xl'>
            <OptionsButton workout={workout} />
            <Card minW={{ base: '3xs', md: '380px' }}>
                <CardHeader>
                    <Heading size='md'>{workout.workoutName}</Heading>
                    {workout.author !== userData!.handle && (
                        <Text _hover={{ cursor: 'pointer' }} onClick={() => navigate(`../../profile/${workout.author}`)}> by {workout.author}</Text>
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
        </Box>
    );
};

export default WorkoutDetails;
