import { FC } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    ModalHeader,
    useToast,
} from '@chakra-ui/react';
import { IWorkout } from '../../../common/types';
import CreateWorkoutForm from '../CreateWorkoutForm/CreateWorkoutForm';

const EditWorkout: FC<{ isOpen: boolean, onClose: () => void, workout: IWorkout }> = ({ isOpen, onClose, workout }) => {
    const toast = useToast();

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}>
            <ModalOverlay />
            <ModalContent
                px={6}
                py={4}
                minW='fit-content'>
                <ModalCloseButton />
                <ModalHeader>Edit Workout</ModalHeader>
                <ModalBody>
                    <CreateWorkoutForm />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default EditWorkout;
