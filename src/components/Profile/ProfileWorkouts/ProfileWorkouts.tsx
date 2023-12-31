import { FC, ReactElement, useEffect, useState } from 'react';
import { VStack, useColorModeValue } from '@chakra-ui/react';
import { IWorkout } from '../../../common/types';
import { getWorkoutsByHandle, sortWorkoutsByDate } from '../../../services/workout.services';
import WorkoutsList from '../../Workouts/WorkoutsList/WorkoutsList';
import { IUserData } from '../../../common/types';

const ProfileWorkouts: FC<{ profile: IUserData }> = ({ profile }): ReactElement => {

    const [myWorkouts, setMyWorkouts] = useState<IWorkout[] | [] | null>(null);
    const [savedWorkouts, setSavedWorkouts] = useState<IWorkout[] | [] | null>(null);

    useEffect(() => {
        getWorkoutsByHandle(profile!.handle)
            .then(workouts => {
                const myWo = sortWorkoutsByDate(workouts.filter(w => w.author === profile.handle));
                setMyWorkouts(myWo);
                const savedWo = sortWorkoutsByDate(workouts.filter(w => w.author !== profile.handle));
                setSavedWorkouts(savedWo);
            })
            .catch(() => {
                setMyWorkouts([]);
                setSavedWorkouts([]);
            });
    }, [profile]);


    return (
        <VStack bg={useColorModeValue('brand.light', 'brand.dark')} gap={2}>
            <WorkoutsList heading={`${profile.handle}'s Workouts:`} workouts={myWorkouts} />
            <WorkoutsList heading='Saved Workouts:' workouts={savedWorkouts} />
        </VStack>
    );
};

export default ProfileWorkouts;
