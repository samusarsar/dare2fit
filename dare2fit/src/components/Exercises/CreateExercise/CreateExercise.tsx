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
    HStack,
    Icon,
    Image,
    Spacer,
    useToast,
} from '@chakra-ui/react';
import { Formik, Field } from 'formik';
import { MdArrowDropDown } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import { ACCEPTED_IMAGE_TYPES, EXERCISE_NAME_MAX_LENGTH } from '../../../common/constants';
import { EXERCISE_NAME_MIN_LENGTH } from '../../../common/constants';
import { addExercise } from '../../../services/exercise.services';
import { AppContext } from '../../../context/AppContext/AppContext';

const CreateExercise: FC = (): ReactElement => {
    const { userData } = useContext(AppContext);

    const [image, setImage] = useState<File | null>(null);
    const [imageError, setImageError] = useState(false);
    const [creating, setCreating] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const handleImageSelect = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files) {
            const file: File = e.target.files[0];
            setImageError(!ACCEPTED_IMAGE_TYPES.includes(file.type));

            if (ACCEPTED_IMAGE_TYPES.includes(file.type)) {
                setImage(file);
            }
        }
    };

    return (
        <HStack justify='center' w='100%' p={4}>
            <Button variant='ghost' w='80%' h='100px' colorScheme='purple'
                onClick={onOpen}><Icon as={IoMdAdd} boxSize={6} mr={2}/>Create Exercise</Button>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    onClose();
                    setImage(null);
                    setImageError(false);
                }}>
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
                        setCreating(true);
                        addExercise(values.exerciseName, userData.handle, values.type, values.difficulty, values.instructions, image)
                            .then(() => {
                                setImage(null);
                                onClose();
                                toast({
                                    title: 'Exercise created successfully!',
                                    description: 'You have added a new exercise.',
                                    status: 'success',
                                    duration: 3000,
                                    isClosable: true,
                                    position: 'top',
                                    variant: 'subtle',
                                });
                            })
                            .catch(() => {
                                toast({
                                    title: 'Error creating exercise!',
                                    description: 'Please try again later.',
                                    status: 'error',
                                    duration: 3000,
                                    isClosable: true,
                                    position: 'top',
                                    variant: 'subtle',
                                });
                            })
                            .finally(() => {
                                setCreating(false);
                            });
                    }}
                >
                    {({ handleSubmit, errors, touched }) => (
                        <form onSubmit={handleSubmit}>
                            <ModalContent
                                px={6}
                                py={4}
                                bg='brand.purple'
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
                                            <FormErrorMessage bg='whiteAlpha.700' p={1} rounded='md'>{errors.exerciseName}</FormErrorMessage>
                                        </FormControl>
                                        <Grid templateColumns='1fr 1fr' gap={2}>
                                            <FormControl isRequired={true}>
                                                <FormLabel htmlFor='type'>Exercise Type</FormLabel>
                                                <Field as={Select} icon={<MdArrowDropDown />} placeholder='Select type' bg='brand.light' color='brand.dark'
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
                                            <FormLabel htmlFor='instructions'>Instructions <i>(optional)</i></FormLabel>
                                            <Field as={Textarea} placeholder='Provide details on how to do this exercise.' bg='brand.light' color='brand.dark'
                                                id='instructions' name='instructions' />
                                        </FormControl>
                                        <HStack w='100%' justify='start' align='start'>
                                            <FormControl isInvalid={imageError}>
                                                <FormLabel>Image <i>(optional)</i></FormLabel>
                                                <Button as={FormLabel} htmlFor='upload' colorScheme='whiteAlpha'>Upload</Button>
                                                <Input id='upload' name='upload' type='file' display='none'
                                                    onChange={handleImageSelect} />
                                                <FormErrorMessage bg='whiteAlpha.700' p={1} rounded='md'>Images should be in still image format.</FormErrorMessage>
                                            </FormControl>
                                            <Spacer />
                                            {image && <Image src={URL.createObjectURL(image)} boxSize='180px' objectFit='cover'/>}
                                        </HStack>
                                    </VStack>
                                </ModalBody>

                                <ModalFooter>
                                    <VStack w='100%' align='center'>
                                        <Button w='40%' colorScheme='yellow' type='submit' isLoading={creating} loadingText='Creating'>
                                            Create Exercise
                                        </Button>
                                        <Button w='40%' colorScheme='blackAlpha' onClick={() => {
                                            onClose();
                                            setImage(null);
                                            setImageError(false);
                                        }}>Cancel</Button>
                                    </VStack>
                                </ModalFooter>
                            </ModalContent>
                        </form>
                    )}
                </Formik>
            </Modal>
        </HStack>
    );
};

export default CreateExercise;
