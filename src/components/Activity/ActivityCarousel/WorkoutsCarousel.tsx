import { FC, useContext, useEffect, useState } from 'react';

import { Box, Flex, HStack, Icon, Select, Spinner, Text, VStack, useColorModeValue } from '@chakra-ui/react';

import { AppContext } from '../../../context/AppContext/AppContext';
import { IWorkout } from '../../../common/types';

import { getWorkoutsByHandle, sortWorkoutsByDate } from '../../../services/workout.services';
import ActivityCarousel from './ActivityCarousel';
import WorkoutDetails from '../../Workouts/WorkoutDetails/WorkoutDetails';
import { WorkoutTypes } from '../../../common/enums';
import { ImFilesEmpty } from 'react-icons/im';


const WorkoutsCarousel: FC = () => {
    const { userData } = useContext(AppContext);

    const [myWorkouts, setMyWorkouts] = useState<IWorkout[] | [] | null>(null);
    const [savedWorkouts, setSavedWorkouts] = useState<IWorkout[] | [] | null>(null);
    const [workoutsView, setWorkoutsView] = useState<string>(WorkoutTypes.my);
    const [index, setIndex] = useState(0);

    const workoutBackground = useColorModeValue('brand.white', 'brand.grey');

    useEffect(() => {
        setIndex(0);
        getWorkoutsByHandle(userData!.handle)
            .then(workouts => {
                const myWo = sortWorkoutsByDate(workouts.filter(w => w.author === userData!.handle));
                setMyWorkouts(myWo);
                const savedWo = sortWorkoutsByDate(workouts.filter(w => w.author !== userData!.handle));
                setSavedWorkouts(savedWo);
            })
            .catch(() => {
                setMyWorkouts([]);
                setSavedWorkouts([]);
            });
    }, [userData]);

    return (
        <Flex justifyContent='flex-start'>
            <Box p={2} borderRadius='lg' bg='brand.green' width='fit'>
                <Flex justifyContent='space-between' alignItems='center' color='brand.dark' gap={2} mb={2}>
                    <Select variant='unstyled' width='50%'
                        onChange={(e) => {
                            setWorkoutsView(e.target.value);
                            setIndex(0);
                        } }>
                        <option value={WorkoutTypes.my}>My Workouts</option>
                        <option value={WorkoutTypes.saved}>Saved Workouts</option>
                    </Select>
                    {(myWorkouts && savedWorkouts) &&
                        <ActivityCarousel setIndex={setIndex} index={index} length={workoutsView === WorkoutTypes.my ? myWorkouts.length : savedWorkouts.length} />}
                </Flex>

                <VStack align='start' rounded='lg'>
                    <Box height='320px' overflow='auto' width={{ base: '2xs', md: 'sm' }}>
                        {(myWorkouts && savedWorkouts) ?
                            ((workoutsView === WorkoutTypes.my && !myWorkouts.length) ? (
                                <HStack w='100%' h='100%' rounded='md' justify='center' boxShadow='lg' overflowX='auto' pb={8} bg={workoutBackground}>
                                    <Icon as={ImFilesEmpty} fontSize='2em' />
                                    <Text>No workouts</Text>
                                </HStack>
                            ) : workoutsView === WorkoutTypes.my ? (
                                <WorkoutDetails workout={myWorkouts[index]} />
                            ) : workoutsView === WorkoutTypes.saved && !savedWorkouts.length ? (
                                <HStack w='100%' h='100%' rounded='md' justify='center' boxShadow='lg' overflowX='auto' pb={8} bg={workoutBackground}>
                                    <Icon as={ImFilesEmpty} fontSize='2em' />
                                    <Text>No saved workouts</Text>
                                </HStack>
                            ) : (
                                <WorkoutDetails workout={savedWorkouts[index]} />
                            )) :
                            (<HStack w='100%' h='100%' rounded='md' justify='center' boxShadow='lg' overflowX='auto' pb={8} bg={workoutBackground}>
                                <Spinner size='xl'/>
                            </HStack>)}
                    </Box>
                </VStack>
            </Box>
        </Flex >
    );
};

export default WorkoutsCarousel;
