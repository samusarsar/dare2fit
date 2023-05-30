import { Box, HStack, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import moment from 'moment';
import { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../context/AppContext/AppContext';
import ActivityLogButton from '../ActivityLogButton/ActivityLogButton';
import { getUserLogByDate } from '../../../services/activity.services';
import ActivityLogDisplay from '../ActivityLogDisplay/ActivityLogDisplay';
import { ITodayLog } from '../../../common/types';

const ActivityLogger: FC = (): ReactElement => {
    const { userData } = useContext(AppContext);

    const [todayLog, setTodayLog] = useState<ITodayLog | null>(null);

    const background = useColorModeValue('brand.white', 'brand.grey');

    const today = moment().format('dddd, MMM Do');

    useEffect(() => {
        getUserLogByDate(userData!.handle, moment().format('DD-MM-YYYY'))
            .then(data => setTodayLog(data))
            .catch(() => setTodayLog(null));
    }, [userData]);

    return (
        <VStack w={{ base: '100%', md: '80%' }} bg='brand.blue' p={6} align='start' rounded='2xl'>
            <Box bg='brand.red' p={3} rounded='full'>
                <Text fontWeight='bold'>{today}</Text>
            </Box>
            <HStack w='100%' flexWrap={{ base: 'wrap', lg: 'nowrap' }} gap={5} spacing={0}>
                <Box w='100%' bg={background} rounded='xl' boxShadow='lg' p={4} >
                    <ActivityLogDisplay todayLog={todayLog} />
                    <ActivityLogButton todayLog={todayLog} />
                </Box>
                <Box w='100%' bg={background} rounded='xl' boxShadow='lg' p={4} >
                    <ActivityLogDisplay todayLog={todayLog} />
                    <ActivityLogButton todayLog={todayLog} />
                </Box>
            </HStack>
        </VStack>
    );
};

export default ActivityLogger;
