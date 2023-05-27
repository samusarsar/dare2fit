import { Dispatch, FC, SetStateAction, useRef, useState } from 'react';

// eslint-disable-next-line max-len
import { Button, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, useDisclosure } from '@chakra-ui/react';
import { GrAdd } from 'react-icons/gr';
import { IWorkoutExercises, ISuggestedExercise } from '../../common/types';
import SingleExercise from './SigleExercise';

interface ISingleSuggestedExerciseProps {
    exercise: ISuggestedExercise,
    workoutExercises: IWorkoutExercises[] | [],
    setWorkoutExercises: Dispatch<SetStateAction<IWorkoutExercises[] | []>>
}

const SingleSuggestedExercise: FC<ISingleSuggestedExerciseProps> = ({ exercise, workoutExercises, setWorkoutExercises }) => {

    const [quantity, setQuantity] = useState(0);
    const [weight, setWeight] = useState(0);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef(null);

    const handleAddExercise = (e: ISuggestedExercise) => {
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
        <SingleExercise exercise={exercise} key={exercise.name}>
            <>
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
            </>
        </SingleExercise>
    );
};

export default SingleSuggestedExercise;
