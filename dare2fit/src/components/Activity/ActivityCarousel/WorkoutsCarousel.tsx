import { FC, useContext, useEffect, useState } from 'react';

import { HStack, Heading, Select, Text } from '@chakra-ui/react';

import { AppContext } from '../../../context/AppContext/AppContext';
import { IWorkout } from '../../../common/types';
import { getWorkoutsByUser } from '../../../services/workout.services';
import ActivityCarousel from './ActivityCarousel';
import WorkoutDetails from '../../Workouts/WorkoutDetails';

const WorkoutsCarousel: FC = () => {
    const { userData } = useContext(AppContext);

    const [myWorkouts, setMyWorkouts] = useState<IWorkout[] | []>([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        getWorkoutsByUser(userData!.handle)
            .then(setMyWorkouts)
            .catch(() => setMyWorkouts([]));
    }, [userData]);

    if (!myWorkouts.length) {
        return (
            <Text>You don&apos;t have workouts, yet...</Text>
        );
    }

    return (
        <ActivityCarousel setIndex={setIndex} index={index} length={myWorkouts.length}>
            <>
                <HStack align='space-between' gap={2} mb={2}>
                    <Heading as='h2' size='lg'>Workouts</Heading>
                    <Select
                    // onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value='myWorkouts'>My Workouts</option>
                        <option value='savedWorkouts'>Saved Workouts</option>
                    </Select>
                </HStack>
                <WorkoutDetails key={myWorkouts[index].workoutId} workout={myWorkouts[index]} />
            </>
        </ActivityCarousel>

    );
};

export default WorkoutsCarousel;
