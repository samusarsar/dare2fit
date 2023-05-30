import { FC, useEffect, useState } from 'react';
import { IGoal } from '../../../common/types';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../config/firebase-config';
import ChallengeRadialBar from '../ChallengeRadialBar/ChallengeRadialBar';
import ChallengeLabels from '../ChallengeLabels/ChallengeLabels';
import HabitRadialBar from '../HabitRadialBar/HabitRadialBar';
import HabitLabels from '../HabitLabels/HabitLabels';
import { GoalTypes } from '../../../common/enums';
import GoalOptionsButton from '../GoalOptionsButton/GoalOptionsButton';

const SingleGoal: FC<{ goal: IGoal }> = ({ goal }) => {
    const [currGoal, setCurrGoal] = useState<IGoal>(goal);

    const background = useColorModeValue('brand.white', 'brand.grey');

    useEffect(() => {
        return onValue(ref(db, `goals/${goal.goalId}`), (snapshot) => {
            setCurrGoal(snapshot.val());
        });
    }, []);

    if (currGoal) {
        return (
            <Box bg={background} rounded='lg' boxShadow='lg' h='100%' p={4} position='relative'>
                <GoalOptionsButton goal={currGoal} />
                <Box h='200px'>
                    {goal.category === GoalTypes.habit ?
                        <HabitRadialBar goal={currGoal}/> :
                        <ChallengeRadialBar goal={currGoal}/>}
                </Box>
                {goal.category === GoalTypes.habit ?
                    <HabitLabels goal={currGoal} /> :
                    <ChallengeLabels goal={currGoal} />}
            </Box>
        );
    }

    return null;
};

export default SingleGoal;
