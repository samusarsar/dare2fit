import { FC, ReactElement, useEffect, useState } from 'react';
import { IGoal } from '../../../common/types';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../config/firebase-config';
import HabitRadialBar from '../HabitRadialBar/HabitRadialBar';
import HabitLabels from '../HabitLabels/HabitLabels';

const SingleHabit: FC<{ goal: IGoal }> = ({ goal }): ReactElement => {
    const [currGoal, setCurrGoal] = useState<IGoal>(goal);

    const background = useColorModeValue('brand.white', 'brand.grey');

    useEffect(() => {
        return onValue(ref(db, `goals/${goal.goalId}`), (snapshot) => {
            setCurrGoal(snapshot.val());
        });
    }, []);

    return (
        <Box bg={background} rounded='lg' boxShadow='lg' w='300px' h='100%' p={4}>
            <Box h='200px'>
                <HabitRadialBar goal={currGoal}/>
            </Box>
            <HabitLabels goal={goal} />
        </Box>
    );
};

export default SingleHabit;
