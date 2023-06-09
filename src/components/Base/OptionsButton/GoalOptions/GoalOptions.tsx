import { FC, useContext, useState } from 'react';
import { IGoal } from '../../../../common/types';
import { Button, Stack } from '@chakra-ui/react';
import { AppContext } from '../../../../context/AppContext/AppContext';
import { competeOnGoal, deleteGoal, stopCompetingOnGoal } from '../../../../services/goal.services';
import { FaFlag } from 'react-icons/fa';
import { GoalTypes, UserRoles } from '../../../../common/enums';
import { IoMdReturnLeft } from 'react-icons/io';
import { FiDelete, FiEdit2 } from 'react-icons/fi';
import { AiOutlineLineChart } from 'react-icons/ai';
import { addNotification } from '../../../../services/notification.services';

const GoalOptions: FC<{ goal: IGoal, onOpen: () => void, onOpenLog: () => void }> = ({ goal, onOpen, onOpenLog }) => {
    const { userData } = useContext(AppContext);

    const [loadingBtnCompete, setLoadingBtnCompete] = useState(false);
    const [loadingBtnDelete, setLoadingBtnDelete] = useState(false);

    const authorIsMe = userData!.handle === goal.author;
    const amCompeting = goal.competingWith ? Object.keys(goal.competingWith).includes(userData!.handle) : false;
    const amAdmin = userData!.role === UserRoles.Admin;

    const handleViewLog = () => {
        onOpenLog();
    };

    const handleCompete = () => {
        setLoadingBtnCompete(true);
        competeOnGoal(userData!.handle, goal.goalId)
            .then(() => addNotification(goal.author, `${userData!.handle} is now competing with you on your '${goal.name}' challenge!`))
            .finally(() => setLoadingBtnCompete(false));
    };

    const handleStopCompeting = () => {
        setLoadingBtnCompete(true);
        stopCompetingOnGoal(userData!.handle, goal.goalId)
            .then(() => addNotification(goal.author, `${userData!.handle} stopped competing with you on your '${goal.name}' challenge!`))
            .finally(() => setLoadingBtnCompete(false));
    };

    const handleEdit = () => {
        onOpen();
    };

    const handleDelete = () => {
        setLoadingBtnDelete(true);
        deleteGoal(userData!.handle, goal.goalId)
            .then(() => setLoadingBtnDelete(false));
    };

    return (
        <Stack>
            {(authorIsMe || amCompeting) &&
            <Button
                w="194px"
                variant="ghost"
                rightIcon={<AiOutlineLineChart />}
                justifyContent="space-between"
                fontWeight="normal"
                fontSize="sm"
                onClick={handleViewLog}>
                View Log
            </Button>}
            {(!authorIsMe && (goal.category === GoalTypes.challenge)) &&
                (!amCompeting ?
                    <Button
                        w="194px"
                        variant="ghost"
                        rightIcon={<FaFlag />}
                        justifyContent="space-between"
                        fontWeight="normal"
                        fontSize="sm"
                        isLoading={loadingBtnCompete}
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
                        isLoading={loadingBtnCompete}
                        onClick={handleStopCompeting}>
                        Exit Competition
                    </Button> )}
            {authorIsMe &&
                <Button
                    w="194px"
                    variant="ghost"
                    rightIcon={<FiEdit2 />}
                    justifyContent="space-between"
                    fontWeight="normal"
                    fontSize="sm"
                    onClick={handleEdit}>
                    Edit Goal
                </Button>}
            {authorIsMe || amAdmin &&
                <Button
                    w="194px"
                    variant="ghost"
                    rightIcon={<FiDelete />}
                    justifyContent="space-between"
                    fontWeight="normal"
                    colorScheme="red"
                    fontSize="sm"
                    isLoading={loadingBtnDelete}
                    onClick={handleDelete}>
                    Delete Goal
                </Button>}
        </Stack>
    );
};

export default GoalOptions;
