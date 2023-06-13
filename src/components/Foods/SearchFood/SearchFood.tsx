import { FC, useState } from 'react';

import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';

import { findFood } from '../../../services/food.services';
import FoodsLayout from '../FoodsLayout/FoodsLayout';
import { IFood } from '../../../common/types';

const SearchFood: FC<{ foodName: string }> = ({ foodName }) => {
    const [suggestedFoods, setSuggestedFoods] = useState<IFood[] | []>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleSearch = () => {
        setIsLoading(true);
        findFood(foodName)
            .then(setSuggestedFoods)
            .then(onOpen)
            .catch(() => setSuggestedFoods([]))
            .finally(() => setIsLoading(false));
    };

    return (
        <>
            <Button
                type='submit'
                w='100%'
                colorScheme='yellow'
                onClick={handleSearch}
                isDisabled={!foodName}
                isLoading={isLoading}>
                Search
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FoodsLayout foods={suggestedFoods} />
                    </ModalBody>

                    <ModalFooter>
                        <Button bg='brand.red' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default SearchFood;
