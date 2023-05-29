import { FC, ReactElement } from 'react';

import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Badge, Box, Flex, HStack, Heading, Text, VStack } from '@chakra-ui/react';
import { BiDumbbell } from 'react-icons/bi';
import { GiBiceps } from 'react-icons/gi';
import { MdSportsGymnastics } from 'react-icons/md';
import { FaWeightHanging } from 'react-icons/fa';

import { IWorkoutExercise, ISuggestedExercise } from '../../../common/types';

const SingleExercise: FC<{ exercise: IWorkoutExercise | ISuggestedExercise, children?: ReactElement }> = ({ exercise, children }) => {

    return (

        <AccordionItem key={exercise.name}>
            <HStack>
                <AccordionButton px={1}>
                    <Box flex='1' textAlign='left'>
                        <Heading size='xs'>{exercise.name}</Heading>
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                {children}
            </HStack>
            <AccordionPanel pb={4}>
                <Flex gap={2} flexDirection='row' flexWrap='wrap' justifyContent='space-evenly'>
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
                        <Badge colorScheme='yellow'>{exercise.type}</Badge>
                    </VStack>

                    {('weight' in exercise) && (
                        <VStack>
                            <FaWeightHanging />
                            <Badge colorScheme='red'>{exercise.weight} kg</Badge>
                        </VStack>
                    )}

                </Flex>
                <Text mt={5}>{exercise.instructions}</Text>

            </AccordionPanel>
        </AccordionItem>

    );
};

export default SingleExercise;
