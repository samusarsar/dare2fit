import { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext/AppContext';
import { getGoalsByHandle } from '../../services/goal.services';
import { VStack } from '@chakra-ui/layout';
import GoalList from '../../components/Goals/GoalList/GoalList';
import CreateGoal from '../../components/Goals/CreateGoal/CreateGoal';
import { IGoal } from '../../common/types';
import { GoalTypes, UserRoles } from '../../common/enums';
import { Alert, AlertIcon } from '@chakra-ui/react';

const GoalsView: FC = (): ReactElement => {
    const { userData } = useContext(AppContext);

    const [habits, setHabits] = useState<IGoal[] | [] | null>(null);
    const [challenges, setChallenges] = useState<IGoal[] | [] | null>(null);

    const amBlocked = userData!.role === UserRoles.Blocked;

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
            {amBlocked &&
            <Alert status='error' w={{ base: '100%', xl: '80%' }}>
                <AlertIcon />
                    You are blocked and can&apos;t add new goals.
            </Alert>}
            <CreateGoal />
            <GoalList goals={habits} goalType={GoalTypes.habit} heading='My Habits:' />
            <GoalList goals={challenges} goalType={GoalTypes.challenge} heading='My Challenges:' />
        </VStack>
    );
};

export default GoalsView;
