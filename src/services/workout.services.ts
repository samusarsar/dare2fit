import { push, ref, get, update, set, remove } from 'firebase/database';
import { db } from '../config/firebase-config';
import { IWorkout, IWorkoutFormValues } from '../common/types';
import moment from 'moment';

/**
 * Adds a workout to the database.
 * @param {IWorkoutFormValues} workout - The workout object.
 * @param {string} handle - The user handle associated with the workout.
 * @return {Promise<string>} A Promise that resolves to the ID of the added workout.
 */
export const addWorkout = (workout: IWorkoutFormValues, handle: string) => {
    return push(
        ref(db, 'workouts'), { ...workout, createdOn: moment(new Date()).format('DD/MM/YYYY HH:mm:ss') },
    ).then(result => {
        const workoutId = result.key;
        update(ref(db, `workouts/${workoutId}`), { 'workoutId': workoutId });
        addWorkoutToUser(workoutId!, handle);
        return workoutId;
    });
};

/**
 * Adds a workout to the user's workout list.
 * @param {string} workoutId - The ID of the workout to add.
 * @param {string} handle  - The user handle.
 * @return {Promise} A Promise that resolves when the workout is added to the user's list.
 */
export const addWorkoutToUser = (workoutId: string, handle: string) => {
    return get(ref(db, `users/${handle}/workouts`))
        .then(snapshot => {
            if (snapshot.exists()) {
                return update(ref(db, `users/${handle}/workouts`), {
                    [workoutId]: true,
                });
            } else {
                return set(ref(db, `users/${handle}/workouts`), {
                    [workoutId]: true,
                });
            }
        });
};

/**
 * Retrieves a workout by workoutId from the database.
 * @param {string} workoutId - The WorkoutId.
 * @return {Promise<IWorkout>} - A promise that resolves to the workout data.
 * @throws {Error} - If no workout is found for the given workoutId.
 */
export const getWorkoutById = (workoutId: string) => {
    return get(ref(db, `workouts/${workoutId}`))
        .then(snapshot => {
            if (!snapshot.exists()) {
                throw new Error('No workout found for this workoutId');
            }
            return snapshot.val();
        });
};

/**
 * Retrieves from the database all workouts a user has.
 * @param {string} handle - The handel of the user.
 * @return {Promise<IWorkout>[]} - An array of promises, that resolves to array of IWorkout objects.
 * @throws {Error} - If no workouts are found for the given user.
 */
export const getWorkoutsByHandle = (handle: string): Promise<IWorkout[]> => {
    return get(ref(db, `users/${handle}/workouts`))
        .then(snapshot => {
            if (!snapshot.exists()) {
                throw new Error('No workouts found for this user');
            }
            return snapshot.val();
        })
        .then(data => {
            const promises = Object.keys(data).map(workoutId => {
                return getWorkoutById(workoutId)
                    .catch(() => {
                        removeWorkoutFromUser(workoutId, handle);
                        return null;
                    });
            });
            return Promise.all(promises);
        })
        .then(workouts => workouts.filter(workout => workout));
};

/**
 * Sorts an array of workouts by date in descending order.
 * @param {IWorkout[]} workouts - The array of workouts to sort.
 * @return {IWorkout[]} - The sorted array of workouts.
 */
export const sortWorkoutsByDate = (workouts: IWorkout[] | []) => {
    return [...workouts].sort((a, b) => moment(b.createdOn, 'DD/MM/YYYY HH;mm;ss').diff(moment(a.createdOn, 'DD/MM/YYYY HH;mm;ss')));
};

/**
 * Removes a workout from a user's list of workouts.
 * @param {string} workoutId - The ID of the workout to be removed.
 * @param {string} handle - The handle of the user.
 * @return {Promise} - A promise that resolves when the workout is successfully removed from the user's list.
 */
export const removeWorkoutFromUser = (workoutId: string, handle: string) => {
    return remove(ref(db, `users/${handle}/workouts/${workoutId}`));
};

/**
 * Deletes a workout from the database and removes it from the user's list of workouts.
 * @param {string} workoutId - The ID of the workout to be deleted.
 * @param {string} handle - The handle of the user.
 * @return {Promise} - A promise that resolves when the workout is successfully deleted.
 */
export const deleteWorkout = (workoutId: string, handle: string) => {
    return remove(ref(db, `workouts/${workoutId}`))
        .then(() => removeWorkoutFromUser(workoutId, handle));
};

/**
 * Edits a workout in the database.
 * @param {IWorkoutFormValues} workout - The updated workout object.
 * @param {string} workoutId - The ID of the workout to be edited.
 * @return {Promise} - A promise that resolves when the workout is successfully edited.
 */
export const editWorkout = (workout: IWorkoutFormValues, workoutId: string) => {

    return update(ref(db, `workouts/${workoutId}`), workout);
};
