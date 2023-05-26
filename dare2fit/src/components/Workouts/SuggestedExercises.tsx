import { FC } from 'react';
import { SuggestedExercise } from '../../common/types';
// eslint-disable-next-line max-len
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Card, CardBody, CardHeader, Flex, HStack, Heading, IconButton, Text } from '@chakra-ui/react';
import { GrAdd } from 'react-icons/gr';

interface SuggestedExercisesProps {
    exercises: SuggestedExercise[] | [] | null;
}

const SuggestedExercises: FC<SuggestedExercisesProps> = ({ exercises }) => {
    if (exercises === null) {
        return (
            <>
                <Heading fontSize={'xl'} fontWeight={500} fontFamily={'body'}>
                    Search for Exercises
                </Heading>
                <Text fontStyle='italic' color={'gray.200'}>access a comprehensive list of thousands of exercises targeting every major muscle group</Text>
            </>
        );
    }
    if (exercises.length === 0) {
        return (
            <Text>No exercises match the searching criteria</Text>
        );
    }
    return (
        <Card>
            <CardHeader>
                <Heading size='md'>Suggested Exercises</Heading>
            </CardHeader>
            <CardBody>
                <Accordion defaultIndex={[0]} allowMultiple>
                    {exercises.map(e => (
                        <AccordionItem key={e.name}>
                            <HStack>
                                <AccordionButton>
                                    <Box as="span" flex='1' textAlign='left'>
                                        {e.name}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                                <IconButton size='sm' aria-label='add exercise' icon={<GrAdd />} />
                            </HStack>
                            <AccordionPanel pb={4}>
                                <Flex flexDirection='row' flexWrap='wrap' justifyContent='space-evenly'>
                                    <Text>equipment: {e.equipment}</Text>
                                    <Text>muscle: {e.muscle}</Text>
                                    <Text>type: {e.type}</Text>
                                </Flex>
                                {e.instructions}
                            </AccordionPanel>
                        </AccordionItem>

                    ))}
                </Accordion>
            </CardBody>
        </Card >
    );
};

export default SuggestedExercises;
