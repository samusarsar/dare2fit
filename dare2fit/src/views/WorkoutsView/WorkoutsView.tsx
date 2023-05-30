import { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { Button, Divider, Heading, Icon, VStack, useColorModeValue } from '@chakra-ui/react';

import { IoMdAdd } from 'react-icons/io';
import { AppContext } from '../../context/AppContext/AppContext';
import { IWorkout } from '../../common/types';
import { getWorkoutsByHandle, sortWorkoutsByDate } from '../../services/workout.services';
import WorkoutsList from '../../components/Workouts/WorkoutsList';

const WorkoutsView: FC = (): ReactElement => {

    const { userData } = useContext(AppContext);

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
        <VStack p={5} bg={useColorModeValue('brand.light', 'brand.dark')} gap={4}>
            <Button
                as={Link}
                to='create'
                w='80%' h='100px' colorScheme='purple'
            >
                <Icon as={IoMdAdd} boxSize={6} mr={2} />
                Create Workout
            </Button>
            <Outlet />

            <Divider />
            <Heading>My workouts</Heading>
            <WorkoutsList workouts={myWorkouts} type={'My'} />
            <Divider />
            <Heading>Saved workouts</Heading>
            <WorkoutsList workouts={savedWorkouts} type={'Saved'} />

        </VStack>
    );
};

export default WorkoutsView;
