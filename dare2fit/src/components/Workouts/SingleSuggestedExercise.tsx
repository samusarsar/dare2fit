import { Dispatch, FC, SetStateAction, useRef, useState } from 'react';

// eslint-disable-next-line max-len
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Flex, FormControl, FormLabel, HStack, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, useDisclosure } from '@chakra-ui/react';
import { GrAdd } from 'react-icons/gr';
import { IWorkoutExercises, SuggestedExercise } from '../../common/types';

interface ISingleSuggestedExerciseProps {
    exercise: SuggestedExercise,
    workoutExercises: IWorkoutExercises[] | [],
    setWorkoutExercises: Dispatch<SetStateAction<IWorkoutExercises[] | []>>
}

const SingleSuggestedExercise: FC<ISingleSuggestedExerciseProps> = ({ exercise, workoutExercises, setWorkoutExercises }) => {

    const [quantity, setQuantity] = useState(0);
    const [weight, setWeight] = useState(0);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef(null);

    const handleAddExercise = (e: SuggestedExercise) => {
        setWorkoutExercises([
            ...workoutExercises,
            {
                ...e,
                quantity: quantity,
                weight: weight,
            },
        ]);
        setQuantity(0);
        setWeight(0);
        onClose();
    };

    return (
        <AccordionItem key={exercise.name}>
            <HStack>
                <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>
                        {exercise.name}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>

                <IconButton
                    isDisabled={workoutExercises.some(e => e.name === exercise.name)}
                    onClick={onOpen}
                    size='sm'
                    aria-label='add exercise'
                    icon={<GrAdd />} />

                <Modal
                    initialFocusRef={initialRef}
                    isOpen={isOpen}
                    onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add {exercise.name} to your workout</ModalHeader>
                        <ModalCloseButton />

                        <ModalBody pb={3}>
                            <FormControl isRequired isInvalid={!quantity}>
                                <FormLabel>reps</FormLabel>
                                {/* <NumberInput onChange={e => setQuantity(e.target.value)} value={quantity} ref={initialRef}> */}
                                <NumberInput onChange={e => setQuantity(+e)} ref={initialRef} min={0} defaultValue={0}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>

                            <FormControl mt={3}>
                                <FormLabel>weight</FormLabel>
                                <Input type='number' onChange={e => setWeight(+e.target.value)} placeholder='kg' />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button isDisabled={!quantity} onClick={() => handleAddExercise(exercise)} colorScheme='blue' mr={3}>
                                Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

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

export default SingleSuggestedExercise;
