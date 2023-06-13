import { FC, useContext, useEffect, useState } from 'react';
import { Box, Flex, Text, VStack } from '@chakra-ui/layout';
import { AppContext } from '../../../context/AppContext/AppContext';
import { useColorModeValue } from '@chakra-ui/color-mode';
import moment from 'moment';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../config/firebase-config';
import WaterRadialBar from './WaterRadialBar/WaterRadialBar';
import WaterIntakeLabels from './WaterIntakeLabels/WaterIntakeLabels';

const WaterIntake: FC = () => {
    const { userData } = useContext(AppContext);

    const [waterLog, setWaterLog] = useState<number>(0);

    const background = useColorModeValue('brand.white', 'brand.grey');

    useEffect(() => {
        const todayDate = moment().format('YYYY-MM-DD');

        return onValue(ref(db, `logs/${userData!.handle}/${todayDate}/calories`), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const waterQ = Object.entries(data).find(([key]) => key === 'water');
                setWaterLog(waterQ!.length ? (waterQ![1] as number) : 0);
            } else {
                setWaterLog(0);
            }
        });
    }, []);

    return (
        <Flex justifyContent='flex-start'>
            <Box p={2} borderRadius='lg' bg='brand.purple' width={{ base: 'fit-content', md: 'sm', lg: 'fit-content' }}>
                <Flex justifyContent='space-between' alignItems='center' color='brand.dark' gap={2} mb={2} h='30px'>
                    <Text>Daily Water Intake</Text>
                </Flex>

                <VStack align='center' rounded='lg'>
                    <Box bg={background} rounded='lg' boxShadow='lg' width={{ base: '2xs', md: 'xs' }} minH='100%' position='relative'>
                        <Box height='300px' overflow='hidden'>
                            <WaterRadialBar waterLog={waterLog} waterTarget={userData!.health?.waterTargetMetric || 0} />
                        </Box>
                        <WaterIntakeLabels waterLog={waterLog} waterTarget={userData!.health?.waterTargetMetric || 0} />
                    </Box>
                </VStack>
            </Box>
        </Flex >
    );
};

export default WaterIntake;
