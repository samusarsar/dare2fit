import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext/AppContext';
import { getGoalsByHandle } from '../../services/goal.services';
import { HStack } from '@chakra-ui/layout';
import SingleHabit from '../../components/Goals/SingleHabit/SingleHabit';
import GoalList from '../../components/Goals/GoalList/GoalList';
import SingleChallenge from '../../components/Goals/SingleChallenge/SingleChallenge';

const GoalsView: React.FC = () => {
    const { userData } = useContext(AppContext);

    const [habits, setHabits] = useState<[] | null>(null);
    const [challenges, setChallenges] = useState<[] | null>(null);

    useEffect(() => {
        if (userData) {
            getGoalsByHandle(userData.handle)
                .then(data => {
                    setHabits(Object.values(data).filter(goal => goal.repeat));
                    setChallenges(Object.values(data).filter(goal => goal.duration));
                })
                .catch(() => {
                    setHabits([]);
                    setChallenges([]);
                });
        }
    }, [userData]);

    return (
        <HStack gap={2} flexWrap='wrap'>
            <GoalList goals={habits} heading='My Habits:' SingleGoal={SingleHabit} />
            <GoalList goals={challenges} heading='My Challenges:' SingleGoal={SingleChallenge} />
        </HStack>
    );
};

export default GoalsView;
