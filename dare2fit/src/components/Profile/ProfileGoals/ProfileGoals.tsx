import { FC, useEffect, useState } from 'react';
import { IGoal, IUserData } from '../../../common/types';
import { getGoalsByHandle } from '../../../services/goal.services';
import { VStack } from '@chakra-ui/react';
import GoalList from '../../Goals/GoalList/GoalList';
import SingleHabit from '../../Goals/SingleHabit/SingleHabit';
import SingleChallenge from '../../Goals/SingleChallenge/SingleChallenge';
import { GoalTypes } from '../../../common/enums';

const ProfileGoals: FC<{ profile: IUserData }> = ({ profile }) => {
    const [habits, setHabits] = useState<IGoal[] | [] | null>(null);
    const [challenges, setChallenges] = useState<IGoal[] | [] | null>(null);

    useEffect(() => {
        getGoalsByHandle(profile.handle)
            .then((data: IGoal[]) => {
                setHabits(Object.values(data).filter(goal => goal.repeat));
                setChallenges(Object.values(data).filter(goal => goal.duration));
            })
            .catch(() => {
                setHabits([]);
                setChallenges([]);
            });
    }, []);

    return (
        <VStack gap={2}>
            <GoalList goals={habits} goalType={GoalTypes.habit} heading={`${profile.handle}'s Habits:`} SingleGoal={SingleHabit} />
            <GoalList goals={challenges} goalType={GoalTypes.challenge} heading={`${profile.handle}'s Challenges:`} SingleGoal={SingleChallenge} />
        </VStack>
    );
};

export default ProfileGoals;
