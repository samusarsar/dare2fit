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
import { competeOnGoal, deleteGoal, stopCompetingOnGoal } from '../../../services/goal.services';
import EditGoal from '../EditGoal/EditGoal';
import { GoalTypes } from '../../../common/enums';
import { FaFlag } from 'react-icons/fa';
import { IoMdReturnLeft } from 'react-icons/io';

const GoalOptionsButton: FC<{ goal: IGoal }> = ({ goal }): ReactElement => {
    const { userData } = useContext(AppContext);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const authorIsMe = userData!.handle === goal.author;
    const amCompeting = goal.competingWith ? Object.keys(goal.competingWith).includes(userData!.handle) : false;

    const handleCompete = () => {
        competeOnGoal(userData!.handle, goal.goalId);
    };

    const handleStopCompeting = () => {
        stopCompetingOnGoal(userData!.handle, goal.goalId);
    };

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
                            {(!authorIsMe && (goal.category === GoalTypes.challenge)) &&
                                (!amCompeting ?
                                    <Button
                                        w="194px"
                                        variant="ghost"
                                        rightIcon={<FaFlag />}
                                        justifyContent="space-between"
                                        fontWeight="normal"
                                        fontSize="sm"
                                        onClick={handleCompete}>
                                        Compete
                                    </Button> :
                                    <Button
                                        w="194px"
                                        variant="ghost"
                                        rightIcon={<IoMdReturnLeft />}
                                        justifyContent="space-between"
                                        fontWeight="normal"
                                        fontSize="sm"
                                        onClick={handleStopCompeting}>
                                        Exit Competition
                                    </Button> )}
                            {authorIsMe &&
                            <>
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
                            </>}
                        </Stack>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Flex>
    );
};

export default GoalOptionsButton;
