import { FC, useContext } from 'react';
import { IGoal } from '../../../../common/types';
import { Button, Stack } from '@chakra-ui/react';
import { AppContext } from '../../../../context/AppContext/AppContext';
import { competeOnGoal, deleteGoal, stopCompetingOnGoal } from '../../../../services/goal.services';
import { FaFlag } from 'react-icons/fa';
import { GoalTypes } from '../../../../common/enums';
import { IoMdReturnLeft } from 'react-icons/io';
import { FiDelete, FiEdit2 } from 'react-icons/fi';

const GoalOptions: FC<{ goal: IGoal, onOpen: () => void }> = ({ goal, onOpen }) => {
    const { userData } = useContext(AppContext);

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
    );
};

export default GoalOptions;
