import { FC, useContext, useEffect, useState } from 'react';

import { Box, Flex, Select, VStack } from '@chakra-ui/react';

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
        setIndex(0);
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
        <Flex justifyContent='flex-start'>
            <Box p={2} borderRadius='lg' bg='brand.yellow' width='fit'>
                <Flex justifyContent='space-between' alignItems='center' color='brand.dark' gap={2} mb={2}>
                    <Select variant='unstyled' width='50%'
                        onChange={(e) => {
                            setGoalsView(e.target.value);
                            setIndex(0);
                        } }>
                        <option value={GoalTypes.habit}>Habits</option>
                        <option value={GoalTypes.challenge}>Challenges</option>
                    </Select>
                    <ActivityCarousel setIndex={setIndex} index={index} length={goalsView === GoalTypes.habit ? habits.length : challenges.length}></ActivityCarousel>
                </Flex>

                <VStack align='start' rounded='lg'>
                    <Box height='320px' width={{ base: '2xs', md: 'xs' }}>
                        {goalsView === GoalTypes.habit && !habits.length ? (
                            <Box width={{ base: 'fit', md: 'sm' }} minW='3xs' bg='brand.yellow' margin='auto'>You don&apos;t have habits, yet...</Box>
                        ) : goalsView === GoalTypes.habit ? (
                            <SingleGoal goal={habits[index]} />
                        ) : goalsView === GoalTypes.challenge && !challenges.length ? (
                            <Box width={{ base: 'fit', md: 'sm' }} minW='3xs' bg='brand.yellow' margin='auto'>You don&apos;t have challenges, yet...</Box>
                        ) : (
                            <SingleGoal goal={challenges[index]} />
                        )}
                    </Box>
                </VStack>
            </Box>
        </Flex >
    );
};

export default GoalsCarousel;
