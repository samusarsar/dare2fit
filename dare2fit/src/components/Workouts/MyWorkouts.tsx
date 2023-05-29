import { FC, useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext/AppContext';
import { getWorkoutsByUser } from '../../services/workout.services';
import { IWorkout } from '../../common/types';
import WorkoutDetails from './WorkoutDetails';
import { Flex, Heading } from '@chakra-ui/react';

const MyWorkouts: FC = () => {
    const { userData } = useContext(AppContext);

    const [myWorkouts, setMyWorkouts] = useState<IWorkout[] | []>([]);

    useEffect(() => {
        getWorkoutsByUser(userData!.handle)
            .then(setMyWorkouts)
            .catch(() => setMyWorkouts([]));
    }, [userData]);

    console.log(myWorkouts);

    if (myWorkouts.length === 0) {
        return (
            <Heading size='md'>You don&apos;t have workouts, yet...</Heading>
        );
    }

    return (
        < Flex gap = { 2} >
            { myWorkouts.map(workout => (<WorkoutDetails key={workout.workoutId} workout={workout} />)) }
        </Flex >
    );
};

export default MyWorkouts;
