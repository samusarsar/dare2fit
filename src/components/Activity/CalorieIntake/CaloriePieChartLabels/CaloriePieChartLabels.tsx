import { HStack, Heading, Icon, Spacer, Text, VStack } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';
import { TiEquals } from 'react-icons/ti';
import { MdBalance } from 'react-icons/md';


const CaloriePieChartLabels: FC<{ calorieLog: {[key: string]: number}, recommendedCalories: number }> = ({ calorieLog, recommendedCalories }): ReactElement => {

    const calorieIntake = Object.values(calorieLog).reduce((acc, curr) => acc + curr, 0);

    return (
        <VStack align='start' w='100%' p={2} >
            <Heading as='h3' size='md' bottom={20} textAlign='center' w='100%'>Calorie Intake</Heading>
            <HStack w='100%' justify='space-evenly' p={4} rounded='lg'>
                {((calorieIntake > recommendedCalories - 40) && (calorieIntake < recommendedCalories + 40) ) ?
                    <Icon as={TiEquals} color='brand.green' /> :
                    calorieIntake < recommendedCalories ?
                        <Icon as={BiDownArrow} color='brand.yellow' /> :
                        <Icon as={BiUpArrow} color='brand.yellow' />
                }
                <Text align='center'>{calorieIntake} kcal</Text>
                <Spacer />
                <Icon as={MdBalance} fontSize='1.2em'/>
                <Text align='center'>{recommendedCalories} kcal</Text>
            </HStack>
        </VStack>
    );
};

export default CaloriePieChartLabels;
