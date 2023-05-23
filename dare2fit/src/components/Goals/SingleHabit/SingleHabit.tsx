import { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { IGoal } from '../../../common/types';
import { Box, VStack, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { ResponsiveRadialBar } from '@nivo/radial-bar';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../config/firebase-config';
import HabitRadialBar from '../HabitRadialBar/HabitRadialBar';
import HabitLabels from '../HabitLabels/HabitLabels';

const SingleHabit: FC<{ goal: IGoal }> = ({ goal }): ReactElement => {
    const [currGoal, setCurrGoal] = useState<IGoal>(goal);

    useEffect(() => {
        return onValue(ref(db, `goals/${goal.goalId}`), (snapshot) => {
            setCurrGoal(snapshot.val());
        });
    }, []);

    return (
        <Box bg={useColorModeValue('brand.white', 'brand.gray')} rounded='lg' boxShadow='lg' w='300px' p={4}>
            <Box h='200px'>
                <HabitRadialBar goal={currGoal}/>
            </Box>
            <HabitLabels goal={goal} />
        </Box>
    );
};

export default SingleHabit;
