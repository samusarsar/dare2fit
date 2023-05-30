import { FC } from 'react';
import { IWorkout } from '../../common/types';
import WorkoutDetails from './WorkoutDetails';
import { Flex, Heading } from '@chakra-ui/react';


const WorkoutsList: FC<{ workouts: IWorkout[] | [], type: string}> = ({ workouts, type }) => {

    if (workouts.length === 0) {
        return (
            <Heading size='sm'>You don&apos;t have {type} Workouts, yet...</Heading>
        );
    }

    return (
        <Flex width='100%' gap={2} overflowX='auto' >
            { workouts.map(workout => (<WorkoutDetails key={workout.workoutId} workout={workout} />)) }
        </Flex >
    );
};

export default WorkoutsList;
