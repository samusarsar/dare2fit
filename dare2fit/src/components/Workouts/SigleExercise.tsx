import { FC, ReactElement } from 'react';

import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, HStack, Text } from '@chakra-ui/react';
import { IWorkoutExercises, ISuggestedExercise } from '../../common/types';

const SingleExercise: FC<{ exercise: IWorkoutExercises | ISuggestedExercise, children?: ReactElement}> = ({ exercise, children }) => {

    return (

        <AccordionItem key={exercise.name}>
            <HStack>
                <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>
                        {exercise.name}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                {children}
            </HStack>
            <AccordionPanel pb={4}>
                <Flex flexDirection='row' flexWrap='wrap' justifyContent='space-evenly'>
                    <Text>equipment: {exercise.equipment}</Text>
                    <Text>muscle: {exercise.muscle}</Text>
                    <Text>type: {exercise.type}</Text>
                </Flex>
                {exercise.instructions}
            </AccordionPanel>
        </AccordionItem>

    );
};

export default SingleExercise;
