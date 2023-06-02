import { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { Box, Button, HStack, Icon, VStack, useColorModeValue } from '@chakra-ui/react';

import { IoMdAdd } from 'react-icons/io';
import { AppContext } from '../../context/AppContext/AppContext';
import { IWorkout } from '../../common/types';
import { getWorkoutsByHandle, sortWorkoutsByDate } from '../../services/workout.services';
import WorkoutsList from '../../components/Workouts/WorkoutsList/WorkoutsList';
import CreateWorkoutForm from '../../components/Workouts/CreateWorkoutForm/CreateWorkoutForm';

const WorkoutsView: FC = (): ReactElement => {
    const { userData } = useContext(AppContext);

    const { pathname } = useLocation();

    const [myWorkouts, setMyWorkouts] = useState<IWorkout[] | []>([]);
    const [savedWorkouts, setSavedWorkouts] = useState<IWorkout[] | []>([]);

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
        <VStack bg={useColorModeValue('brand.light', 'brand.dark')} gap={2}>
            <HStack justify="center" w="100%" p={4}>
                <Button
                    as={Link}
                    to={pathname === '/workouts' ? 'create' : '../../workouts'}
                    w='80%'
                    h='100px'
                    colorScheme='purple'
                    rounded='xl'
                    variant={pathname === '/workouts' ? 'solid' : 'outline'}
                >
                    <Icon as={IoMdAdd} boxSize={6} mr={2} />
                    Create Workout
                </Button>
            </HStack>

            {pathname === '/workouts/create' &&
                <Box p={6} bg={useColorModeValue('brand.white', 'brand.grey')} boxShadow={'2xl'} rounded={'md'} w='100%' overflowX='auto'>
                    <Outlet />
                </Box>}

            <WorkoutsList heading='My Workouts:' workouts={myWorkouts} type={'My'} />
            <WorkoutsList heading='Saved Workouts:' workouts={savedWorkouts} type={'My'} />
        </VStack>
    );
};

export default WorkoutsView;
