import { FC, ReactElement, useEffect, useState } from 'react';
import { Box, HStack, Heading, VStack } from '@chakra-ui/layout';
import { IGoal } from '../../../common/types';
import SingleHabit from '../SingleHabit/SingleHabit';
import { Select } from '@chakra-ui/select';

const GoalList: FC<{ goals: IGoal[], heading: string, SingleGoal: ReactElement }> = ({ goals, heading, SingleGoal }): ReactElement => {
    const [filter, setFilter] = useState('all');
    console.log(filter);
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
                        <></>
                    )}
            </HStack>
            {goalsToShow &&
                (<Box w='100%' overflowX='auto' pb={8}>
                    <HStack gap={2}>

                        {goalsToShow.map(goal =>
                            <SingleGoal key={goal.goalId} goal={goal} />)}
                    </HStack>
                </Box>)}
        </VStack>
    );
};

export default GoalList;
