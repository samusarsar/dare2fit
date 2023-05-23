import { Box, Flex, HStack, Heading, Icon, Spacer, Text, VStack } from '@chakra-ui/react';
// import IconBox from 'components/Icons/IconBox';
import { FC, ReactElement } from 'react';
import { BiTargetLock } from 'react-icons/bi';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { IGoal } from '../../../common/types';

const HabitLabels: FC<{ goal: IGoal }> = ({ goal }): ReactElement => {
    return (
        <VStack align='center'>
            <Heading as='h3' size='md'>{goal.type.charAt(0).toUpperCase() + goal.type.slice(1)} {goal.repeat.charAt(0).toUpperCase() + goal.repeat.slice(1)}</Heading>
            <HStack w='100%' justify='space-evenly' p={2} rounded='lg'>
                <Icon as={AiOutlineClockCircle} fontSize='1.2em' color={'green'}/>
                <Text>{goal[goal.author]} {goal.units}</Text>
                <Spacer />
                <Icon as={BiTargetLock} fontSize='1.2em'/>
                <Text>{goal.target} {goal.units}</Text>
            </HStack>
        </VStack>
    );
};

export default HabitLabels;
