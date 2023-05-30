import { push, ref, get, update, set } from 'firebase/database';
import { db } from '../config/firebase-config';
import { IWorkoutFormValues } from '../common/types';
import moment from 'moment';

/**
 * Adds a workout to the database.
 * @param {IWorkoutFormValues} workout - The workout object.
 * @param {string} handle - The user handle associated with the workout.
 * @return {Promise<string>} A Promise that resolves to the ID of the added workout.
 */
export const addWorkout = (workout: IWorkoutFormValues, handle: string) => {
    // const newWorkout = { ...workout, createdOn: moment(new Date()) };
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
 * @return {Promise<void>} A Promise that resolves when the workout is added to the user's list.
 */
const addWorkoutToUser = (workoutId: string, handle: string) => {
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
export const getWorkoutsByUser = (handle: string) => {
    return get(ref(db, `users/${handle}/workouts`))
        .then(snapshot => {
            if (!snapshot.exists()) {
                throw new Error('No workouts found for this user');
            }
            return snapshot.val();
        })
        .then(workouts => {
            return Promise.all(Object.keys(workouts).map(workoutId => getWorkoutById(workoutId)));
        });
};
