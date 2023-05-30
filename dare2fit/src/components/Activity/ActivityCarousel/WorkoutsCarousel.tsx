import { FC, useContext, useEffect, useState } from 'react';

import { Box, HStack, Heading, Select, Text, VStack } from '@chakra-ui/react';

import { AppContext } from '../../../context/AppContext/AppContext';
import { IWorkout } from '../../../common/types';
import { getWorkoutsByHandle, sortWorkoutsByDate } from '../../../services/workout.services';
import ActivityCarousel from './ActivityCarousel';
import WorkoutDetails from '../../Workouts/WorkoutDetails';

const WorkoutsCarousel: FC = () => {
    const { userData } = useContext(AppContext);

    const [myWorkouts, setMyWorkouts] = useState<IWorkout[] | []>([]);
    const [savedWorkouts, setSavedWorkouts] = useState<IWorkout[] | []>([]);
    const [workoutsView, setWorkoutsView] = useState('my');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        getWorkoutsByHandle(userData!.handle)
            .then(workouts => {
                const myWo = sortWorkoutsByDate(workouts.filter(w => w.author === userData!.handle));
                setMyWorkouts(myWo);
                const savedWo = sortWorkoutsByDate(workouts.filter(w => w.author !== userData!.handle));
                setSavedWorkouts(savedWo);
            })
            .catch(() => setMyWorkouts([]));
    }, [userData]);

    return (
        <VStack px={1} align='start' rounded='lg'>
            <HStack align='space-between' gap={2} mb={2}>
                <Heading as='h2' size='lg'>Workouts</Heading>
                <Select
                    onChange={(e) => setWorkoutsView(e.target.value)}>
                    <option value='my'>My Workouts</option>
                    <option value='saved'>Saved Workouts</option>
                </Select>
            </HStack>

            <VStack align='start' rounded='lg'>
                <Box height='300px' overflow='auto'>
                    {workoutsView === 'my' && !myWorkouts.length ? (
                        <Text>You don&apos;t have workouts, yet...</Text>
                    ) : workoutsView === 'my' ? (
                        <>
                            <ActivityCarousel setIndex={setIndex} index={index} length={myWorkouts.length}></ActivityCarousel>
                            <WorkoutDetails workout={myWorkouts[index]} />

                        </>

                    ) : workoutsView === 'saved' && !savedWorkouts.length ? (
                        <Text>You don&apos;t have saved workouts, yet...</Text>
                    ) : (
                        <>
                            <ActivityCarousel setIndex={setIndex} index={index} length={savedWorkouts.length}></ActivityCarousel>
                            <WorkoutDetails workout={savedWorkouts[index]} />

                        </>

                    )}
                </Box>
            </VStack>
        </VStack >
    );
};

export default WorkoutsCarousel;
