import { FC, ReactElement, useEffect, useState } from 'react';
import { Box, HStack, Heading, VStack, Text } from '@chakra-ui/layout';
import { IGoal } from '../../../common/types';
import { Select } from '@chakra-ui/select';
import moment from 'moment';
import { Icon, useColorModeValue } from '@chakra-ui/react';
import { ImFilesEmpty } from 'react-icons/im';
import CreateGoal from '../CreateGoal/CreateGoal';
import { useParams } from 'react-router';
import { GoalTypes } from '../../../common/enums';

const GoalList: FC<{ goals: IGoal[] | null, goalType: GoalTypes, heading: string, SingleGoal: FC<{ goal: IGoal }> }> = ({ goals, goalType, heading, SingleGoal }): ReactElement => {
    const [filter, setFilter] = useState('all');
    const [goalsToShow, setGoalsToShow] = useState(goals);

    const background = useColorModeValue('brand.white', 'brand.grey');

    const { handle } = useParams();

    useEffect(() => {
        if (goals) {
            switch (filter) {
            case 'all':
                setGoalsToShow(goals);
                break;
            case 'daily':
                setGoalsToShow(goals.filter(goal => goal.repeat === 'daily'));
                break;
            case 'weekly':
                setGoalsToShow(goals.filter(goal => goal.repeat === 'weekly'));
                break;
            case 'monthly':
                setGoalsToShow(goals.filter(goal => goal.repeat === 'monthly'));
                break;
            case 'solo':
                setGoalsToShow(goals.filter(goal => !goal.competingWith));
                break;
            case 'competing':
                setGoalsToShow(goals.filter(goal => goal.competingWith));
                break;
            case 'active':
                setGoalsToShow(goals.filter(goal => moment(new Date().toLocaleDateString(), 'DD/MM/YYYY') < moment(goal.duration?.endDate, 'DD/MM/YYYY')));
                break;
            case 'expired':
                setGoalsToShow(goals.filter(goal => moment(new Date().toLocaleDateString(), 'DD/MM/YYYY') > moment(goal.duration?.endDate, 'DD/MM/YYYY')));
                break;
            }
        }
    }, [filter, goals]);

    return (
        <VStack align='start' p={4} w='100%' rounded='lg'>
            <HStack align='space-between' gap={2} mb={2}>
                <Heading as='h2' size='lg'>{heading}</Heading>
                {goalType === GoalTypes.habit ?
                    (<Select w='110px' onChange={(e) => setFilter(e.target.value)}>
                        <option value='all'>All</option>
                        <option value='daily'>Daily</option>
                        <option value='weekly'>Weekly</option>
                        <option value='monthly'>Monthly</option>
                    </Select>) : (
                        <Select w='110px' onChange={(e) => setFilter(e.target.value)}>
                            <option value='all'>All</option>
                            <optgroup label='Style'>
                                <option value='solo'>Solo</option>
                                <option value='competing'>Competing</option>
                            </optgroup>
                            <optgroup label='Status'>

                                <option value='active'>Active</option>
                                <option value='expired'>Expired</option>
                            </optgroup>
                        </Select>
                    )}
            </HStack>
            {(goalsToShow && !goalsToShow.length) &&
                (<HStack w='310px' h='250px' rounded='md' justify='center' boxShadow='lg' overflowX='auto' pb={8} bg={background}>
                    {!handle ?
                        <CreateGoal index={goalType === GoalTypes.habit ? 0 : 1} /> :
                        <>
                            <Icon as={ImFilesEmpty} fontSize='2em' />
                            <Text>No {goalType === GoalTypes.habit ? 'habits' : 'challenges'}</Text>
                        </>}
                </HStack>)}
            {goalsToShow &&
                (<Box w='100%' overflowX='auto' pb={8}>
                    <HStack gap={2} h='100%' align='start'>

                        {goalsToShow.map(goal =>
                            <SingleGoal key={goal.goalId} goal={goal} />)}
                    </HStack>
                </Box>)}
        </VStack>
    );
};

export default GoalList;
