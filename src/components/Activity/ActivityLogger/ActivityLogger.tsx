import { Box, HStack, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import moment from 'moment';
import { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context/AppContext/AppContext';
import ActivityLogButton from '../ActivityLogButton/ActivityLogButton';
import ActivityLogDisplay from '../ActivityLogDisplay/ActivityLogDisplay';
import { ITodayLog } from '../../../common/types';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../config/firebase-config';

const ActivityLogger: FC = (): ReactElement => {
    const { userData } = useContext(AppContext);

    const [todayLog, setTodayLog] = useState<ITodayLog | null>(null);

    const background = useColorModeValue('brand.white', 'brand.grey');

    const today = moment().format('dddd, MMM Do');

    useEffect(() => {
        const todayDate = moment().format('YYYY-MM-DD');

        return onValue(ref(db, `logs/${userData!.handle}/${todayDate}`), (snapshot) => {
            const data = snapshot.val();
            setTodayLog(data);
        });
    }, []);

    return (
        <VStack w='100%' bg='brand.blue' p={6} align='start' rounded='lg'>
            <Box bg='brand.red' p={3} rounded='full' mb={4}>
                <Text fontWeight='bold'>{today}</Text>
            </Box>
            <HStack w='100%' flexWrap={{ base: 'wrap', lg: 'nowrap' }} gap={5} spacing={0}>
                <Box w='100%' bg={background} rounded='lg' boxShadow='lg' p={4} >
                    <ActivityLogDisplay todayLog={todayLog} />
                    <ActivityLogButton todayLog={todayLog} />
                </Box>
                <Box w='100%' bg={background} rounded='lg' boxShadow='lg' p={4} >
                    <ActivityLogDisplay todayLog={todayLog} />
                    <ActivityLogButton todayLog={todayLog} />
                </Box>
            </HStack>
        </VStack>
    );
};

export default ActivityLogger;
