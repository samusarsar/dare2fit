import { FC, useContext, useEffect, useState } from 'react';

import { Box, Flex, HStack, Heading, Select, Text, VStack } from '@chakra-ui/react';

import { AppContext } from '../../../context/AppContext/AppContext';
import { IGoal } from '../../../common/types';
import ActivityCarousel from './ActivityCarousel';
import { getGoalsByHandle } from '../../../services/goal.services';
import SingleGoal from '../../Goals/SingleGoal/SingleGoal';
import { GoalTypes } from '../../../common/enums';

const GoalsCarousel: FC = () => {
    const { userData } = useContext(AppContext);

    const [habits, setHabits] = useState<IGoal[] | []>([]);
    const [challenges, setChallenges] = useState<IGoal[] | []>([]);
    const [goalsView, setGoalsView] = useState<string>(GoalTypes.habit);
    const [index, setIndex] = useState(0);

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
        <VStack px={1} align='start' rounded='lg'>
            <HStack align='space-between' gap={2} mb={2}>
                <Select
                    onChange={(e) => setGoalsView(e.target.value)}>
                    <option value={GoalTypes.habit}>Habits</option>
                    <option value={GoalTypes.challenge}>Challenges</option>
                </Select>
            </HStack>

            <VStack align='start' rounded='lg'>
                <Box height='300px' overflow='auto'>
                    {goalsView === GoalTypes.habit && !habits.length ? (
                        <Text>You don&apos;t have habits, yet...</Text>
                    ) : goalsView === GoalTypes.habit ? (
                        <>
                            <ActivityCarousel setIndex={setIndex} index={index} length={habits.length}></ActivityCarousel>
                            <SingleGoal goal={habits[index]} />

                        </>

                    ) : goalsView === GoalTypes.challenge && !challenges.length ? (
                        <Flex><Text>You don&apos;t have challenges, yet...</Text></Flex>
                    ) : (
                        <>
                            <ActivityCarousel setIndex={setIndex} index={index} length={challenges.length}></ActivityCarousel>
                            <SingleGoal goal={challenges[index]} />

                        </>

                    )}
                </Box>
            </VStack>
        </VStack >
    );
};

export default GoalsCarousel;
