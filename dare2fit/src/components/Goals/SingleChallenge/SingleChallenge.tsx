import { FC, ReactElement, useEffect, useState } from 'react';
import { IGoal } from '../../../common/types';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../config/firebase-config';
import ChallengeRadialBar from '../ChallengeRadialBar/ChallengeRadialBar';
import ChallengeLabels from '../ChallengeLabels/ChallengeLabels';

const SingleChallenge: FC<{ goal: IGoal }> = ({ goal }): ReactElement => {
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
                <ChallengeRadialBar goal={currGoal}/>
            </Box>
            <ChallengeLabels goal={currGoal} />
        </Box>
    );
};

export default SingleChallenge;
