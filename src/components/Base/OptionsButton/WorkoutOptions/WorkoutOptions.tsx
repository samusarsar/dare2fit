import { FC, useContext } from 'react';
import { IWorkout } from '../../../../common/types';
import { Button, Stack } from '@chakra-ui/react';
import { AppContext } from '../../../../context/AppContext/AppContext';
import { FiDelete, FiEdit2 } from 'react-icons/fi';
import { addWorkoutToUser, deleteWorkout, removeWorkoutFromUser } from '../../../../services/workout.services';
import { BsSave, BsSaveFill } from 'react-icons/bs';
import { addNotification } from '../../../../services/notification.services';

const WorkoutOptions: FC<{ workout: IWorkout, onOpen: () => void }> = ({ workout, onOpen }) => {
    const { userData } = useContext(AppContext);

    const authorIsMe = userData!.handle === workout.author;
    const isSaved = userData!.workouts ? Object.keys(userData!.workouts).includes(workout.workoutId) : false;

    const handleSave = () => {
        addWorkoutToUser(workout.workoutId, userData!.handle);
        addNotification(workout.author, `${userData!.handle} has saved your workout '${workout.workoutName}!`);
    };

    const handleUnsave = () => {
        removeWorkoutFromUser(workout.workoutId, userData!.handle);
        addNotification(workout.author, `${userData!.handle} has unsaved your workout '${workout.workoutName}.`);
    };

    const handleEdit = () => {
        onOpen();
    };

    const handleDelete = () => {
        deleteWorkout(workout.workoutId, userData!.handle);
    };

    return (
        <Stack>
            {!authorIsMe ?
                <>
                    {(!isSaved) ?
                        (<Button
                            w="194px"
                            variant="ghost"
                            rightIcon={<BsSaveFill />}
                            justifyContent="space-between"
                            fontWeight="normal"
                            fontSize="sm"
                            onClick={handleSave}>
                                Save Workout
                        </Button>) :
                        (<Button
                            w="194px"
                            variant="ghost"
                            rightIcon={<BsSave />}
                            justifyContent="space-between"
                            fontWeight="normal"
                            fontSize="sm"
                            onClick={handleUnsave}>
                                Unsave Workout
                        </Button>)}
                </> :
                <>
                    <Button
                        w="194px"
                        variant="ghost"
                        rightIcon={<FiEdit2 />}
                        justifyContent="space-between"
                        fontWeight="normal"
                        fontSize="sm"
                        onClick={handleEdit}>
                            Edit Workout
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
                            Delete Workout
                    </Button>
                </>}
        </Stack>
    );
};

export default WorkoutOptions;
