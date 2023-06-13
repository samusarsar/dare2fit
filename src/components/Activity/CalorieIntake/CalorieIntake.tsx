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
import { Icon } from '@chakra-ui/react';
import { ImFilesEmpty } from 'react-icons/im';

const CalorieIntake: FC = () => {
    const { userData } = useContext(AppContext);

    const [calorieLog, setCalorieLog] = useState({});

    const background = useColorModeValue('brand.white', 'brand.grey');

    useEffect(() => {
        const todayDate = moment().format('YYYY-MM-DD');

        return onValue(ref(db, `logs/${userData!.handle}/${todayDate}/calories`), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
                const { water, ...todayCalories } = data;
                setCalorieLog(todayCalories);
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
                            {Object.keys(calorieLog).length ?
                                <CaloriePieChart calorieLog={calorieLog} /> :
                                <VStack h="100%" justify="center">
                                    <Icon as={ImFilesEmpty} fontSize="2em" />
                                    <Text>No food logged today</Text>
                                </VStack>}
                        </Box>
                        <CaloriePieChartLabels calorieLog={calorieLog} recommendedCalories={profileCalories} />
                    </Box>
                </VStack>
            </Box>
        </Flex >
    );
};

export default CalorieIntake;
