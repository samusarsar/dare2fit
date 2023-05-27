import { FC, ReactElement } from 'react';

import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Badge, Box, Flex, HStack, Heading, Text, VStack } from '@chakra-ui/react';
import { BiDumbbell } from 'react-icons/bi';
import { GiBiceps } from 'react-icons/gi';
import { MdSportsGymnastics } from 'react-icons/md';

import { IWorkoutExercise, ISuggestedExercise } from '../../common/types';

const SingleExercise: FC<{ exercise: IWorkoutExercise | ISuggestedExercise, children?: ReactElement }> = ({ exercise, children }) => {

    return (

        <AccordionItem key={exercise.name}>
            <HStack>
                <AccordionButton>
                    <Box flex='1' textAlign='left'>
                        <Heading size='xs'>{exercise.name}</Heading>
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                {children}
            </HStack>
            <AccordionPanel pb={4}>
                <Flex flexDirection='row' flexWrap='wrap' justifyContent='space-evenly'>
                    <VStack>
                        <BiDumbbell />
                        <Badge colorScheme='purple'>{exercise.equipment}</Badge>
                    </VStack>

                    <VStack>
                        <GiBiceps />
                        <Badge colorScheme='green'>{exercise.muscle}</Badge>
                    </VStack>

                    <VStack>
                        <MdSportsGymnastics />
                        <Badge colorScheme='red'>{exercise.type}</Badge>
                    </VStack>
                </Flex>
                <Text mt={5}>{exercise.instructions}</Text>

            </AccordionPanel>
        </AccordionItem>

    );
};

export default SingleExercise;
