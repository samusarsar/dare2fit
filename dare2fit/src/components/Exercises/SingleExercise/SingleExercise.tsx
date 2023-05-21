import { FC, ReactElement } from 'react';

import {
    Avatar,
    Badge,
    Button,
    Flex,
    Td,
    Text,
    Tr,
    VStack,
    useColorModeValue,
} from '@chakra-ui/react';
import { IExercise } from '../../../common/types';

const SingleExerciseRow: FC<{ exercise: IExercise }> = ({ exercise }): ReactElement => {
    const textColor = useColorModeValue('gray.700', 'white');

    let backUpImage;

    switch (exercise.type) {
    case 'walking':
        backUpImage = 'https://firebasestorage.googleapis.com/v0/b/dare2fit-f6eb4.appspot.com/o/assets%2Fpedestrian-man.png?alt=media&token=78c29f2a-d282-44f1-8fd7-d0308857ffd7';
        break;
    case 'running':
        backUpImage = 'https://firebasestorage.googleapis.com/v0/b/dare2fit-f6eb4.appspot.com/o/assets%2Frun.png?alt=media&token=685acae9-7433-4297-806f-e3505b9573d3';
        break;
    case 'cycling':
        backUpImage = 'https://firebasestorage.googleapis.com/v0/b/dare2fit-f6eb4.appspot.com/o/assets%2Fbicycle.png?alt=media&token=d5b2c767-3ac4-48f4-9296-7e5f441495f3';
        break;
    case 'swimming':
        backUpImage = 'https://firebasestorage.googleapis.com/v0/b/dare2fit-f6eb4.appspot.com/o/assets%2Fcardio.png?alt=media&token=7b08cdce-4577-4154-b3ee-c3499c5ef745';
        break;
    case 'stretching':
    case 'lo-cardio':
    case 'hi-cardio':
        backUpImage = 'https://firebasestorage.googleapis.com/v0/b/dare2fit-f6eb4.appspot.com/o/assets%2Fcardio.png?alt=media&token=7b08cdce-4577-4154-b3ee-c3499c5ef745';
        break;
    default:
        backUpImage = 'https://firebasestorage.googleapis.com/v0/b/dare2fit-f6eb4.appspot.com/o/assets%2Fweight.png?alt=media&token=04ebdb72-5335-4be8-b5ea-865a0794f0dd';
    }

    return (
        <Tr>
            <Td pl="0px">
                <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                    <Avatar src={exercise.imageURL || backUpImage} w="100px" h='100px' borderRadius="12px" me="18px" p={2} />
                    <Flex direction="column">
                        <Text
                            fontSize="md"
                            color={textColor}
                            fontWeight="bold"
                            minWidth="100%"
                        >
                            {exercise.exerciseName}
                        </Text>
                        <Text fontSize="sm" color="gray.400" fontWeight="normal">
                            Created: {exercise.createdOn.split(' ')[0]}
                        </Text>
                        {exercise.lastEdited &&
                        <Text fontSize="sm" color="gray.400" fontWeight="normal">
                            Modified: {exercise.lastEdited.split(' ')[0]}
                        </Text>}
                    </Flex>
                </Flex>
            </Td>

            <Td>
                <Flex direction="column">
                    <Text fontSize="md" color={textColor} fontWeight="bold">
                        {exercise.type}
                    </Text>
                    <Text fontSize="sm" color="gray.400" fontWeight="normal">
                        Units: &apos;{exercise.units}&apos;
                    </Text>
                </Flex>
            </Td>
            <Td>
                <Badge
                    bg={exercise.difficulty === 'beginner' ? 'green.400' :
                        exercise.difficulty === 'intermediate' ? 'blue.400' :
                            'brand.purple'}
                    color='brand.light'
                    fontSize="14px"
                    p="3px 10px"
                    borderRadius="8px"
                >
                    {exercise.difficulty}
                </Badge>
            </Td>
            <Td maxW='350px'>
                <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
                    {exercise.instructions}
                </Text>
            </Td>
            <Td>
                <VStack align='start'>
                    <Button bg="transparent">
                        <Text
                            fontSize="md"
                            color="gray.400"
                            fontWeight="bold"
                            variant='ghost'
                        >
                            Edit
                        </Text>
                    </Button>
                    <Button bg="transparent" variant='ghost' colorScheme='pink'>
                        <Text
                            fontSize="md"
                            color="brand.red"
                            fontWeight="bold"
                        >
                            Delete
                        </Text>
                    </Button>
                </VStack>
            </Td>
        </Tr>
    );
};

export default SingleExerciseRow;
