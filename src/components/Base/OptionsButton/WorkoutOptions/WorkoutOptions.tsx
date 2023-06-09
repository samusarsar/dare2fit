import { FC, useContext, useEffect, useState } from 'react';
import { IWorkout } from '../../../../common/types';
import { Button, Stack } from '@chakra-ui/react';
import { AppContext } from '../../../../context/AppContext/AppContext';
import { FiDelete, FiEdit2 } from 'react-icons/fi';
import { addWorkoutToUser, deleteWorkout, removeWorkoutFromUser } from '../../../../services/workout.services';
import { BsSave, BsSaveFill } from 'react-icons/bs';
import { addNotification } from '../../../../services/notification.services';
import { UserRoles } from '../../../../common/enums';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../../config/firebase-config';
import moment from 'moment';
import { logActivity, unlogActivity } from '../../../../services/activity.services';
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';

const WorkoutOptions: FC<{ workout: IWorkout, onOpen: () => void }> = ({ workout, onOpen }) => {
    const { userData } = useContext(AppContext);

    const [todayWorkoutIsLogged, setTodayWorkoutIsLogged] = useState<boolean | null>(null);
    const [thisWorkoutIsLogged, setThisWorkoutIsLogged] = useState<boolean | null>(null);

    const [loadingBtnSave, setLoadingBtnSave] = useState(false);
    const [loadingBtnDelete, setLoadingBtnDelete] = useState(false);
    const [loadingBtnLog, setLoadingBtnLog] = useState(false);

    const authorIsMe = userData!.handle === workout.author;
    const isSaved = userData!.workouts ? Object.keys(userData!.workouts).includes(workout.workoutId) : false;
    const amAdmin = userData!.role === UserRoles.Admin;

    const handleSave = () => {
        setLoadingBtnSave(true);
        addWorkoutToUser(workout.workoutId, userData!.handle)
            .then(() => addNotification(workout.author, `${userData!.handle} has saved your workout '${workout.workoutName}!`))
            .finally(() => setLoadingBtnSave(false));
    };

    const handleUnsave = () => {
        setLoadingBtnSave(true);
        removeWorkoutFromUser(workout.workoutId, userData!.handle)
            .then(() => addNotification(workout.author, `${userData!.handle} has unsaved your workout '${workout.workoutName}.`))
            .finally(() => setLoadingBtnSave(false));
    };

    const handleEdit = () => {
        onOpen();
    };

    const handleDelete = () => {
        setLoadingBtnDelete(true);
        deleteWorkout(workout.workoutId, userData!.handle)
            .then(() => setLoadingBtnDelete(false));
    };

    const handleLogWorkout = () => {
        setLoadingBtnLog(true);
        logActivity({ handle: userData!.handle, activityType: 'workout', loggedValue: `${workout.workoutName}_${workout.category}_${workout.workoutId}` })
            .then(() => setLoadingBtnLog(false));
    };

    const handleUnlogWorkout = () => {
        setLoadingBtnLog(true);
        unlogActivity({ handle: userData!.handle, activityType: 'workout' })
            .then(() => setLoadingBtnLog(false));
    };

    useEffect(() => {
        const todayDate = moment().format('YYYY-MM-DD');

        return onValue(ref(db, `logs/${userData!.handle}/${todayDate}`), (snapshot) => {
            if (!snapshot.exists()) {
                setTodayWorkoutIsLogged(false);
                setThisWorkoutIsLogged(false);
            } else {
                const data = snapshot.val();

                setTodayWorkoutIsLogged(Object.keys(data).includes('workout'));
                setThisWorkoutIsLogged(Object.keys(data).includes('workout') && data.workout.workoutId === workout.workoutId);
            }
        });
    }, [todayWorkoutIsLogged]);

    return (
        <Stack>
            {((authorIsMe || isSaved) && (todayWorkoutIsLogged !== null && thisWorkoutIsLogged !== null)) &&
            (!todayWorkoutIsLogged ?
                (<Button
                    w="194px"
                    variant="ghost"
                    rightIcon={<BiLogInCircle />}
                    justifyContent="space-between"
                    fontWeight="normal"
                    fontSize="sm"
                    isLoading={loadingBtnLog}
                    onClick={handleLogWorkout}>
                        Log Workout
                </Button>) :
                (thisWorkoutIsLogged ?
                    (<Button
                        w="194px"
                        variant="ghost"
                        rightIcon={<BiLogOutCircle />}
                        justifyContent="space-between"
                        fontWeight="normal"
                        fontSize="sm"
                        isLoading={loadingBtnLog}
                        onClick={handleUnlogWorkout}>
                        Unlog Workout
                    </Button>) :
                    (<Button
                        w="194px"
                        variant="ghost"
                        rightIcon={<BiLogInCircle />}
                        justifyContent="space-between"
                        fontWeight="normal"
                        fontSize="sm"
                        isLoading={loadingBtnLog}
                        onClick={handleLogWorkout}>
                        Overwrite Workout Log
                    </Button>)))}
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
                            isLoading={loadingBtnSave}
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
                            isLoading={loadingBtnSave}
                            onClick={handleUnsave}>
                                Unsave Workout
                        </Button>)}
                </> :
                <Button
                    w="194px"
                    variant="ghost"
                    rightIcon={<FiEdit2 />}
                    justifyContent="space-between"
                    fontWeight="normal"
                    fontSize="sm"
                    onClick={handleEdit}>
                        Edit Workout
                </Button>}
            {(authorIsMe || amAdmin) &&
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
                Delete Workout
            </Button>}
        </Stack>
    );
};

export default WorkoutOptions;
