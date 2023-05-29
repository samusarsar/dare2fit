import { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext/AppContext';
import { getGoalsByHandle } from '../../services/goal.services';
import { VStack } from '@chakra-ui/layout';
import SingleHabit from '../../components/Goals/SingleHabit/SingleHabit';
import GoalList from '../../components/Goals/GoalList/GoalList';
import SingleChallenge from '../../components/Goals/SingleChallenge/SingleChallenge';
import CreateGoal from '../../components/Goals/CreateGoal/CreateGoal';
import { IGoal } from '../../common/types';
import { GoalTypes } from '../../common/enums';

const GoalsView: FC = (): ReactElement => {
    const { userData } = useContext(AppContext);

    const [habits, setHabits] = useState<IGoal[] | [] | null>(null);
    const [challenges, setChallenges] = useState<IGoal[] | [] | null>(null);

    useEffect(() => {
        getGoalsByHandle(userData!.handle)
            .then((data: IGoal[]) => {
                setHabits(Object.values(data).filter(goal => goal.repeat));
                setChallenges(Object.values(data).filter(goal => goal.duration));
            })
            .catch(() => {
                setHabits([]);
                setChallenges([]);
            });
    }, [userData]);

    return (
        <VStack gap={2}>
            <CreateGoal />
            <GoalList goals={habits} goalType={GoalTypes.habit} heading='My Habits:' SingleGoal={SingleHabit} />
            <GoalList goals={challenges} goalType={GoalTypes.challenge} heading='My Challenges:' SingleGoal={SingleChallenge} />
        </VStack>
    );
};

export default GoalsView;
