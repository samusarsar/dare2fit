import { FC, useContext, useEffect, useState } from 'react';

import { Box, Flex, Text, VStack } from '@chakra-ui/layout';

import { AppContext } from '../../../context/AppContext/AppContext';
import { calculateCalories } from '../../../services/user.services';
import CaloriePieChart from './CaloriePieChart/CaloriePieChart';
import { useColorModeValue } from '@chakra-ui/color-mode';
import CaloriePieChartLabels from './CaloriePieChartLabels/CaloriePieChartLabels';
import moment from 'moment';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../config/firebase-config';

const CalorieIntake: FC = () => {
    const { userData } = useContext(AppContext);

    const [calorieLog, setCalorieLog] = useState({});

    const background = useColorModeValue('brand.white', 'brand.grey');

    useEffect(() => {
        const todayDate = moment().format('YYYY-MM-DD');

        return onValue(ref(db, `logs/${userData!.handle}/${todayDate}/calories`), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setCalorieLog(data);
            } else {
                setCalorieLog({});
            }
        });
    }, []);

    const profileCalories = calculateCalories(userData!);

    return (
        <Flex justifyContent='flex-start'>
            <Box p={2} borderRadius='lg' bg='brand.red' width={{ base: 'fit-content', md: 'sm', lg: 'fit-content' }}>
                <Flex justifyContent='space-between' alignItems='center' color='brand.dark' gap={2} mb={2}>
                    <Text>Daily Calorie Intake</Text>
                </Flex>

                <VStack align='center' rounded='lg'>
                    <Box bg={background} rounded='lg' boxShadow='lg' width={{ base: '2xs', md: 'xs' }} minH='100%' position='relative'>
                        <Box height='300px' overflow='hidden'>
                            <CaloriePieChart calorieLog={calorieLog} />
                        </Box>
                        <CaloriePieChartLabels calorieLog={calorieLog} recommendedCalories={profileCalories} />
                    </Box>
                </VStack>
            </Box>
        </Flex >
    );
};

export default CalorieIntake;
