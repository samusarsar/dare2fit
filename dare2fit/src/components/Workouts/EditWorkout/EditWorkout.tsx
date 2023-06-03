import { FC } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    ModalHeader,
} from '@chakra-ui/react';
import { IWorkout } from '../../../common/types';
import WorkoutForm from '../WorkoutForm/WorkoutForm';

const EditWorkout: FC<{ isOpen: boolean, onClose: () => void, workout: IWorkout }> = ({ isOpen, onClose, workout }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}>
            <ModalOverlay />
            <ModalContent
                px={{ base: 0, sm: 6 }}
                py={4}
                minW={{ base: 'fit-content', md: '90%', lg: '80%' }}>
                <ModalCloseButton />
                <ModalHeader>Edit Workout</ModalHeader>
                <ModalBody>
                    <WorkoutForm workout={workout} onClose={onClose} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default EditWorkout;
