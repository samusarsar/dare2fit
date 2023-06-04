import { FC, useContext } from 'react';

import { Box, Flex, Text, VStack } from '@chakra-ui/layout';

import { AppContext } from '../../../context/AppContext/AppContext';
import { calculateCalories } from '../../../services/user.services';

const CalorieIntake: FC = () => {
    const { userData } = useContext(AppContext);

    const profileCalories = calculateCalories(userData!); // Sammie, use this for the chart
    console.log(profileCalories);

    return (
        <Flex justifyContent='flex-start'>
            <Box p={2} borderRadius='lg' bg='brand.red' width={{ base: 'fit-content', md: 'sm', lg: 'fit-content' }}>
                <Flex justifyContent='space-between' alignItems='center' color='brand.dark' gap={2} mb={2}>
                    <Text>Daily Calorie Intake</Text>
                </Flex>

                <VStack align='center' rounded='lg'>
                    <Box height='320px' overflow='auto' width={{ base: '2xs', md: 'xs' }}>

                    </Box>
                </VStack>
            </Box>
        </Flex >
    );
};

export default CalorieIntake;
