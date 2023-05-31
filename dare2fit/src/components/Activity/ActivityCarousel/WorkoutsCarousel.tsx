import { FC, useContext, useEffect, useState } from 'react';

import { Box, Flex, Select, VStack } from '@chakra-ui/react';

import { AppContext } from '../../../context/AppContext/AppContext';
import { IWorkout } from '../../../common/types';

import { getWorkoutsByHandle, sortWorkoutsByDate } from '../../../services/workout.services';
import ActivityCarousel from './ActivityCarousel';
import WorkoutDetails from '../../Workouts/WorkoutDetails';
import { WorkoutTypes } from '../../../common/enums';


const WorkoutsCarousel: FC = () => {
    const { userData } = useContext(AppContext);

    const [myWorkouts, setMyWorkouts] = useState<IWorkout[] | []>([]);
    const [savedWorkouts, setSavedWorkouts] = useState<IWorkout[] | []>([]);
    const [workoutsView, setWorkoutsView] = useState<string>(WorkoutTypes.my);
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
        <Flex justifyContent='flex-start'>
            <Box p={2} borderRadius='lg' bg='brand.green' color='brand.dark' width='fit'>
                <Flex justifyContent='space-between' alignItems='center' gap={2} mb={2}>
                    <Select variant='unstyled' width='50%'
                        onChange={(e) => {
                            setWorkoutsView(e.target.value);
                            setIndex(0);
                        } }>
                        <option value={WorkoutTypes.my}>My Workouts</option>
                        <option value={WorkoutTypes.saved}>Saved Workouts</option>
                    </Select>
                    <ActivityCarousel setIndex={setIndex} index={index} length={workoutsView === WorkoutTypes.my ? myWorkouts.length : savedWorkouts.length}></ActivityCarousel>
                </Flex>

                <VStack align='start' rounded='lg'>
                    <Box height='300px' overflow='auto'>
                        {workoutsView === WorkoutTypes.my && !myWorkouts.length ? (
                            <Box width={{ base: 'fit', md: 'sm' }} minW='3xs' bg='brand.green' margin='auto'>You don&apos;t have workouts, yet...</Box>
                        ) : workoutsView === WorkoutTypes.my ? (
                            <WorkoutDetails workout={myWorkouts[index]} />
                        ) : workoutsView === WorkoutTypes.saved && !savedWorkouts.length ? (
                            <Box width={{ base: 'fit', md: 'sm' }} minW='3xs' bg='brand.green' margin='auto'>You don&apos;t have saved workouts, yet...</Box>
                        ) : (
                            <WorkoutDetails workout={savedWorkouts[index]} />
                        )}
                    </Box>
                </VStack>
            </Box>
        </Flex >
    );
};

export default WorkoutsCarousel;
