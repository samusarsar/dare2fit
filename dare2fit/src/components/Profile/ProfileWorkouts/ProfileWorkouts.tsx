import { FC, ReactElement, useEffect, useState } from 'react';
import { Divider, Heading, VStack, useColorModeValue } from '@chakra-ui/react';
import { IWorkout } from '../../../common/types';
import { getWorkoutsByHandle, sortWorkoutsByDate } from '../../../services/workout.services';
import WorkoutsList from '../../../components/Workouts/WorkoutsList';
import { IUserData } from '../../../common/types';

const ProfileWorkouts: FC<{ profile: IUserData }> = ({ profile }): ReactElement => {

    const [myWorkouts, setMyWorkouts] = useState<IWorkout[] | []>([]);
    const [savedWorkouts, setSavedWorkouts] = useState<IWorkout[] | []>([]);

    useEffect(() => {
        getWorkoutsByHandle(profile!.handle)
            .then(workouts => {
                const myWo = sortWorkoutsByDate(workouts.filter(w => w.author === profile.handle));
                setMyWorkouts(myWo);
                const savedWo = sortWorkoutsByDate(workouts.filter(w => w.author !== profile.handle));
                setSavedWorkouts(savedWo);
            })
            .catch(() => setMyWorkouts([]));
    }, [profile]);


    return (
        <VStack p={5} bg={useColorModeValue('brand.light', 'brand.dark')} gap={4}>
            <Heading>{profile.handle}&apos;s Workouts</Heading>
            <WorkoutsList workouts={myWorkouts} type={'My'} />
            <Divider />
            <Heading>Saved Workouts</Heading>
            <WorkoutsList workouts={savedWorkouts} type={'Saved'} />
        </VStack>
    );
};

export default ProfileWorkouts;
