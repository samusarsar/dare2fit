import { FC, ReactElement } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    VStack,
    HStack,
    Icon,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    useColorModeValue,
} from '@chakra-ui/react';
import { IoMdAdd } from 'react-icons/io';
import HabitForm from './HabitForm/HabitForm';
import ChallengeForm from './ChallengeForm/ChallengeForm';

const CreateGoal: FC<{ index?: number }> = ({ index = 0 }): ReactElement => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const backgroundColor = useColorModeValue('brand.white', 'brand.grey');

    return (
        <HStack justify="center" w="100%" p={4}>
            <Button
                w='80%'
                h="100px"
                colorScheme="green"
                rounded="xl"
                onClick={onOpen}
            >
                <Icon as={IoMdAdd} boxSize={6} mr={2} />
            Add Goal
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    onClose();
                }}
            >
                <ModalOverlay />
                <ModalContent
                    px={6}
                    py={4}
                    bg={backgroundColor}
                >
                    <ModalHeader>Add Goal</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Tabs variant="solid-rounded" defaultIndex={index} isFitted>
                            <TabList>
                                <Tab>Habit</Tab>
                                <Tab>Challenge</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <HabitForm onClose={onClose} />
                                </TabPanel>
                                <TabPanel>
                                    <VStack>
                                        <ChallengeForm onClose={onClose} />
                                    </VStack>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </HStack>
    );
};

export default CreateGoal;
