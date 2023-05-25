import { FC, ReactElement, useEffect, useState } from 'react';
import { Box, HStack, Heading, VStack } from '@chakra-ui/layout';
import { IGoal } from '../../../common/types';
import { Select } from '@chakra-ui/select';
import moment from 'moment';

const GoalList: FC<{ goals: IGoal[] | null, heading: string, SingleGoal: FC<{ goal: IGoal }> }> = ({ goals, heading, SingleGoal }): ReactElement => {
    const [filter, setFilter] = useState('all');
    const [goalsToShow, setGoalsToShow] = useState(goals);

    useEffect(() => {
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
    }, [filter, goals]);

    return (
        <VStack align='start' p={4} w='100%' rounded='lg'>
            <HStack align='space-between' gap={2}>
                <Heading as='h2' size='lg'>{heading}</Heading>
                {heading === 'My Habits:' ?
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
