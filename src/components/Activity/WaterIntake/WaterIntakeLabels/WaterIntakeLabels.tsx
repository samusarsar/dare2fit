import { HStack, Heading, Icon, Spacer, Text, VStack } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';
import { MdWaterDrop, MdWater } from 'react-icons/md';

const WaterIntakeLabels: FC<{ waterLog: number, waterTarget: number }> = ({ waterLog, waterTarget }): ReactElement => {
    return (
        <VStack align='start' w='100%' p={2} >
            <Heading as='h3' size='md' bottom={20} textAlign='center' w='100%'>Water Intake</Heading>
            <HStack w='100%' justify='space-evenly' p={4} rounded='lg'>
                <Icon as={MdWaterDrop} />
                <Text align='center'>{waterLog} ml</Text>
                <Spacer />
                <Icon as={MdWater} fontSize='1.2em'/>
                <Text align='center'>{waterTarget} ml</Text>
            </HStack>
        </VStack>
    );
};

export default WaterIntakeLabels;
