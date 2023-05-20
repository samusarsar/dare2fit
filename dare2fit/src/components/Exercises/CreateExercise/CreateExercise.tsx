import { ChangeEvent, FC, ReactElement, useContext, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    useDisclosure,
    Select,
    Textarea,
    VStack,
    Grid,
    FormErrorMessage,
} from '@chakra-ui/react';
import { Formik, Field } from 'formik';
import { MdArrowDropDown } from 'react-icons/md';
import { ACCEPTED_IMAGE_TYPES, EXERCISE_NAME_MAX_LENGTH } from '../../../common/constants';
import { EXERCISE_NAME_MIN_LENGTH } from '../../../common/constants';
import { addExercise } from '../../../services/exercise.services';
import { AppContext } from '../../../context/AppContext/AppContext';

const CreateExercise: FC = (): ReactElement => {
    const { userData } = useContext(AppContext);

    const [image, setImage] = useState<File | null>(null);
    const [imageError, setImageError] = useState<boolean>(false);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleImageSelect = (e: ChangeEvent<HTMLInputElement>): void => {
        setImageError(!ACCEPTED_IMAGE_TYPES.includes(e.target.files[0].type));

        if (ACCEPTED_IMAGE_TYPES.includes(e.target.files[0].type)) {
            setImage(e.target.files[0]);
        }
    };

    return (
        <>
            <Button variant='outline' border='4px solid' borderColor='brand.blue' w='80%' h='100px'
                onClick={onOpen}>Open Modal</Button>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <Formik
                    initialValues={{
                        exerciseName: '',
                        type: '',
                        difficulty: '',
                        instructions: '',
                        upload: '',
                    }}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={(values) => {
                        addExercise(values.exerciseName, userData.handle, values.type, values.difficulty, values.instructions, image);
                        setImage(null);
                    }}
                >
                    {({ handleSubmit, errors, touched }) => (
                        <form onSubmit={handleSubmit}>
                            <ModalContent
                                bg='brand.blue'
                                color='brand.light'>
                                <ModalHeader>Create a new exercise</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody pb={6}>
                                    <VStack>

                                        <FormControl isInvalid={!!errors.exerciseName && touched.exerciseName} isRequired={true}>
                                            <FormLabel>Exercise Name</FormLabel>
                                            <Field as={Input} id='exerciseName' name='exerciseName' type='text' placeholder='Jogging' bg='brand.light' color='brand.dark'
                                                validate={(value: string) => {
                                                    return (value.length < EXERCISE_NAME_MIN_LENGTH || value.length > EXERCISE_NAME_MAX_LENGTH) ?
                                                        'Exercise name must be between 4 and 30 characters.' :
                                                        null;
                                                }}/>
                                            <FormErrorMessage>{errors.exerciseName}</FormErrorMessage>
                                        </FormControl>
                                        <Grid templateColumns='1fr 1fr' gap={2}>
                                            <FormControl isRequired={true}>
                                                <FormLabel htmlFor='type'>Exercise Type</FormLabel>
                                                <Field as={Select} icon={<MdArrowDropDown />} placeholder='Select exercise type' bg='brand.light' color='brand.dark'
                                                    id='type' name='type'>
                                                    <optgroup label='Lifestyle Sports'>
                                                        <option value='walking'>Walking</option>
                                                        <option value='running'>Running</option>
                                                        <option value='cycling'>Cycling</option>
                                                        <option value='swimming'>Swimming</option>
                                                    </optgroup>
                                                    <optgroup label='Conditioning Exercises'>
                                                        <option value='stretching'>Stretching</option>
                                                        <option value='hi-carido'>High-intensity Cardio</option>
                                                        <option value='lo-carido'>Low-intensity Cardio</option>
                                                    </optgroup>
                                                    <optgroup label='Fitness Exercises'>
                                                        <option value='arms'>Arms</option>
                                                        <option value='chest'>Chest</option>
                                                        <option value='back'>Back</option>
                                                        <option value='core'>Core</option>
                                                        <option value='legs'>Legs</option>
                                                    </optgroup>
                                                </Field>
                                            </FormControl>
                                            <FormControl isRequired={true}>
                                                <FormLabel htmlFor='difficulty'>Difficulty</FormLabel>
                                                <Field as={Select} icon={<MdArrowDropDown />} placeholder='Select difficulty' bg='brand.light' color='brand.dark'
                                                    id='difficulty' name='difficulty'>
                                                    <option value='beginner'>Beginner</option>
                                                    <option value='intermediate'>Intermediate</option>
                                                    <option value='advanced'>Advanced</option>
                                                </Field>
                                            </FormControl>
                                        </Grid>

                                        <FormControl>
                                            <FormLabel htmlFor='instructions'>Instructions (optional)</FormLabel>
                                            <Field as={Textarea} placeholder='Provide details on how to do this exercise.' bg='brand.light' color='brand.dark'
                                                id='instructions' name='instructions' />
                                        </FormControl>
                                        <FormControl isInvalid={imageError}>
                                            <FormLabel htmlFor='upload'>Image (optional)</FormLabel>
                                            <Input id='upload' name='upload' type='file'
                                                onChange={handleImageSelect} />
                                            <FormErrorMessage>Images should be in still image format.</FormErrorMessage>
                                        </FormControl>
                                    </VStack>
                                </ModalBody>

                                <ModalFooter>
                                    <VStack w='100%' align='center'>
                                        <Button w='40%' colorScheme='yellow' type='submit'>
                                            Create Exercise
                                        </Button>
                                        <Button w='40%' colorScheme='blackAlpha' onClick={onClose}>Cancel</Button>
                                    </VStack>
                                </ModalFooter>
                            </ModalContent>
                        </form>
                    )}
                </Formik>
            </Modal>
        </>
    );
};

export default CreateExercise;
