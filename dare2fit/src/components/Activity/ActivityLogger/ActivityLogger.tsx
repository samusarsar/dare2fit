import { Box, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import moment from 'moment';
import { FC, ReactElement } from 'react';
import ActivityLogButton from '../ActivityLogButton/ActivityLogButton';

const ActivityLogger: FC = (): ReactElement => {
    const background = useColorModeValue('brand.white', 'brand.grey');

    const today = moment().format('dddd, MMM Do');

    return (
        <VStack w={{ base: '100%', md: '80%' }} bg='brand.blue' p={6} align='start' rounded='2xl'>
            <Box bg='brand.red' p={3} rounded='full'>
                <Text fontWeight='bold'>{today}</Text>
            </Box>
            <Box w='50%' bg={background} rounded='xl' boxShadow='lg' p={2} >
                <ActivityLogButton />
            </Box>
        </VStack>
    );
};

export default ActivityLogger;
