import { FC, useContext, useEffect, useState } from 'react';

import { Box, Flex, HStack, Heading, Select, Text, VStack } from '@chakra-ui/react';

import { AppContext } from '../../../context/AppContext/AppContext';
import { IGoal } from '../../../common/types';
import ActivityCarousel from './ActivityCarousel';
import { getGoalsByHandle } from '../../../services/goal.services';
import SingleGoal from '../../Goals/SingleGoal/SingleGoal';

const GoalsCarousel: FC = () => {
    const { userData } = useContext(AppContext);

    const [habits, setHabits] = useState<IGoal[] | []>([]);
    const [challenges, setChallenges] = useState<IGoal[] | []>([]);
    const [goalsView, setGoalsView] = useState('habits');
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

    // console.log(habits[index]);
    // console.log('test');

    return (
        <VStack px={1} align='start' rounded='lg'>
            <HStack align='space-between' gap={2} mb={2}>
                <Heading as='h2' size='lg'>Goals</Heading>
                <Select
                    onChange={(e) => setGoalsView(e.target.value)}>
                    <option value='habits'>Habits</option>
                    <option value='challenges'>Challenges</option>
                </Select>
            </HStack>

            <VStack align='start' rounded='lg'>
                <Box height='300px' overflow='auto'>
                    {goalsView === 'habits' && !habits.length ? (
                        <Text>You don&apos;t have habits, yet...</Text>
                    ) : goalsView === 'habits' ? (
                        <>
                            <ActivityCarousel setIndex={setIndex} index={index} length={habits.length}></ActivityCarousel>
                            <SingleGoal goal={habits[index]} />

                        </>

                    ) : goalsView === 'challenges' && !challenges.length ? (
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
