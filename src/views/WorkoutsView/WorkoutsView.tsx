import { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Alert, AlertIcon, Button, HStack, Icon, VStack, useColorModeValue } from '@chakra-ui/react';

import { IoMdAdd } from 'react-icons/io';
import { AppContext } from '../../context/AppContext/AppContext';
import { IWorkout } from '../../common/types';
import { getWorkoutsByHandle, sortWorkoutsByDate } from '../../services/workout.services';
import WorkoutsList from '../../components/Workouts/WorkoutsList/WorkoutsList';
import { UserRoles } from '../../common/enums';

const WorkoutsView: FC = (): ReactElement => {
    const { userData } = useContext(AppContext);

    const [myWorkouts, setMyWorkouts] = useState<IWorkout[] | [] | null>(null);
    const [savedWorkouts, setSavedWorkouts] = useState<IWorkout[] | [] | null>(null);

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const amBlocked = userData!.role === UserRoles.Blocked;

    useEffect(() => {
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
        <VStack bg={useColorModeValue('brand.light', 'brand.dark')} gap={2}>
            {amBlocked &&
            <Alert status='error' w={{ base: '100%', xl: '80%' }}>
                <AlertIcon />
                    You are blocked and can&apos;t create new workouts.
            </Alert>}
            <HStack justify="center" w="100%" p={4}>
                <Button
                    isDisabled={amBlocked}
                    w='80%'
                    h='100px'
                    colorScheme='purple'
                    rounded='xl'
                    variant={pathname === '/workouts' ? 'solid' : 'outline'}
                    onClick={() => navigate(pathname === '/workouts' ? 'create' : '../../workouts')}
                >
                    <Icon as={IoMdAdd} boxSize={6} mr={2} />
                    Create Workout
                </Button>
            </HStack>

            <Outlet />

            <WorkoutsList heading='My Workouts:' workouts={myWorkouts} />
            <WorkoutsList heading='Saved Workouts:' workouts={savedWorkouts} />
        </VStack>
    );
};

export default WorkoutsView;
