import { FC, useContext, useEffect, useState } from 'react';

import { Box, Flex, HStack, Icon, Select, Spinner, Text, VStack, useColorModeValue } from '@chakra-ui/react';

import { AppContext } from '../../../context/AppContext/AppContext';
import { IGoal } from '../../../common/types';
import ActivityCarousel from './ActivityCarousel';
import { getGoalsByHandle } from '../../../services/goal.services';
import SingleGoal from '../../Goals/SingleGoal/SingleGoal';
import { GoalTypes } from '../../../common/enums';
import { ImFilesEmpty } from 'react-icons/im';

const GoalsCarousel: FC = () => {
    const { userData } = useContext(AppContext);

    const [habits, setHabits] = useState<IGoal[] | [] | null>(null);
    const [challenges, setChallenges] = useState<IGoal[] | [] | null>(null);
    const [goalsView, setGoalsView] = useState<string>(GoalTypes.habit);
    const [index, setIndex] = useState(0);

    const goalBackground = useColorModeValue('brand.white', 'brand.grey');

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
            <Box p={2} borderRadius='lg' bg='brand.yellow' width={{ base: 'fit-content', md: 'sm', lg: 'fit-content' }}>
                <Flex justifyContent='space-between' alignItems='center' color='brand.dark' gap={2} mb={2}>
                    <Select variant='unstyled' width='50%'
                        onChange={(e) => {
                            setGoalsView(e.target.value);
                            setIndex(0);
                        } }>
                        <option value={GoalTypes.habit}>Habits</option>
                        <option value={GoalTypes.challenge}>Challenges</option>
                    </Select>
                    {(habits && challenges) &&
                        <ActivityCarousel setIndex={setIndex} index={index} length={goalsView === GoalTypes.habit ? habits.length : challenges.length} />}
                </Flex>

                <VStack align='center' rounded='lg'>
                    <Box height='320px' overflow='auto' width={{ base: '2xs', md: 'xs' }}>
                        {(habits && challenges) ?
                            ((goalsView === GoalTypes.habit && !habits.length) ? (
                                <HStack w='100%' h='100%' rounded='md' justify='center' boxShadow='lg' overflowX='auto' pb={8} bg={goalBackground}>
                                    <Icon as={ImFilesEmpty} fontSize='2em' />
                                    <Text>No habitss</Text>
                                </HStack>
                            ) : goalsView === GoalTypes.habit ? (
                                <SingleGoal goal={habits[index]} />
                            ) : goalsView === GoalTypes.challenge && !challenges.length ? (
                                <HStack w='100%' h='100%' rounded='md' justify='center' boxShadow='lg' overflowX='auto' pb={8} bg={goalBackground}>
                                    <Icon as={ImFilesEmpty} fontSize='2em' />
                                    <Text>No challenges</Text>
                                </HStack>
                            ) : (
                                <SingleGoal goal={challenges[index]} />
                            )) :
                            (<HStack w='100%' h='100%' rounded='md' justify='center' boxShadow='lg' overflowX='auto' pb={8} bg={goalBackground}>
                                <Spinner size='xl'/>
                            </HStack>)}
                    </Box>
                </VStack>
            </Box>
        </Flex >
    );
};

export default GoalsCarousel;
