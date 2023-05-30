import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    IconButton,
    Button,
    Stack,
    Flex,
    useDisclosure,
} from '@chakra-ui/react';
import { FC, ReactElement, useContext } from 'react';

import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiEdit2, FiDelete } from 'react-icons/fi';
import { IGoal } from '../../../common/types';
import { AppContext } from '../../../context/AppContext/AppContext';
import { deleteGoal } from '../../../services/goal.services';
import EditGoal from '../EditGoal/EditGoal';

const GoalOptionsButton: FC<{ goal: IGoal }> = ({ goal }): ReactElement => {
    const { userData } = useContext(AppContext);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleEdit = () => {
        onOpen();
    };

    const handleDelete = () => {
        deleteGoal(userData!.handle, goal.goalId);
    };

    return (
        <Flex justifyContent="center" mt={4} position='absolute' top={0} right={3} zIndex={1}>
            <EditGoal isOpen={isOpen} onClose={onClose} goal={goal} />
            <Popover placement="bottom" isLazy>
                <PopoverTrigger>
                    <IconButton
                        aria-label="More server options"
                        icon={<BsThreeDotsVertical />}
                        variant="solid"
                        w="fit-content"
                    />
                </PopoverTrigger>
                <PopoverContent w="fit-content" _focus={{ boxShadow: 'none' }}>
                    <PopoverArrow />
                    <PopoverBody>
                        <Stack>
                            <Button
                                w="194px"
                                variant="ghost"
                                rightIcon={<FiEdit2 />}
                                justifyContent="space-between"
                                fontWeight="normal"
                                fontSize="sm"
                                onClick={handleEdit}>
                                Edit Goal
                            </Button>
                            <Button
                                w="194px"
                                variant="ghost"
                                rightIcon={<FiDelete />}
                                justifyContent="space-between"
                                fontWeight="normal"
                                colorScheme="red"
                                fontSize="sm"
                                onClick={handleDelete}>
                                Delete Goal
                            </Button>
                        </Stack>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Flex>
    );
};

export default GoalOptionsButton;
