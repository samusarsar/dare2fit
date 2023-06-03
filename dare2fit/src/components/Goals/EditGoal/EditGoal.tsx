import { FC } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    VStack,
    FormErrorMessage,
    ModalHeader,
    InputGroup,
    InputRightAddon,
    useToast,
    HStack,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { IGoal } from '../../../common/types';
import { GOAL_NAME_MAX_LENGTH, GOAL_NAME_MIN_LENGTH } from '../../../common/constants';
import { GoalTypes } from '../../../common/enums';
import { editGoal } from '../../../services/goal.services';

const EditGoal: FC<{ isOpen: boolean, onClose: () => void, goal: IGoal }> = ({ isOpen, onClose, goal }) => {
    const toast = useToast();

    const cancelColor = useColorModeValue('blackAlpha', 'gray');

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}>
            <ModalOverlay />
            <ModalContent
                px={6}
                py={4}>
                <ModalCloseButton />
                <ModalHeader>Edit Goal</ModalHeader>
                <ModalBody>
                    <Formik
                        initialValues={{
                            name: goal.name,
                            target: goal.target,
                        }}
                        onSubmit={({ name, target }) => {
                            editGoal({ goalId: goal.goalId, name, target })
                                .then(() => {
                                    onClose();
                                    toast({
                                        title: 'Goal edited successfully!',
                                        description: 'You have edited your goal.',
                                        status: 'success',
                                        duration: 3000,
                                        isClosable: true,
                                        position: 'top',
                                        variant: 'subtle',
                                    });
                                })
                                .catch(() => {
                                    toast({
                                        title: 'Error editing goal!',
                                        description: 'Please try again later.',
                                        status: 'error',
                                        duration: 3000,
                                        isClosable: true,
                                        position: 'top',
                                        variant: 'subtle',
                                    });
                                });
                        }}>
                        {({ handleSubmit, errors, touched }) => (
                            <form onSubmit={handleSubmit}>
                                <VStack w='100%' gap={1}>
                                    {(goal.category === GoalTypes.challenge) &&
                                    <FormControl
                                        isInvalid={!!errors.name && touched.name}
                                    >
                                        <FormLabel>Challenge Name</FormLabel>
                                        <Field
                                            as={Input}
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Enter Challenge Name"
                                            validate={(value: string) => {
                                                return value.length < GOAL_NAME_MIN_LENGTH || value.length > GOAL_NAME_MAX_LENGTH ?
                                                    'Goal name must be between 4 and 30 characters.' :
                                                    null;
                                            }}
                                        />
                                        <FormErrorMessage>
                                            {errors.name}
                                        </FormErrorMessage>
                                    </FormControl>}
                                    <FormControl isInvalid={!!errors.target && touched.target}>
                                        <FormLabel htmlFor="target">
                                        Target:
                                        </FormLabel>
                                        <InputGroup>
                                            <Field
                                                as={Input}
                                                id="target"
                                                name="target"
                                                type='number'
                                                validate={(value: number) => {
                                                    if (value <= 0) {
                                                        return 'Target value must be positive.';
                                                    } else {
                                                        return null;
                                                    }
                                                }}/>
                                            <InputRightAddon>
                                                {goal.units}
                                            </InputRightAddon>
                                        </InputGroup>
                                        <FormErrorMessage>{errors.target}</FormErrorMessage>
                                    </FormControl>
                                </VStack>
                                <HStack w="100%" justify="center" mt={10}>
                                    <Button
                                        w="40%"
                                        colorScheme="green"
                                        type="submit"
                                        loadingText="Creating"
                                    >
                                        Edit Goal
                                    </Button>
                                    <Button
                                        w="40%"
                                        colorScheme={cancelColor}
                                        onClick={() => {
                                            onClose();
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </HStack>
                            </form>)}
                    </Formik>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default EditGoal;
