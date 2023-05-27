import { push, ref, get, update, set } from 'firebase/database';
import { db } from '../config/firebase-config';
import { IWorkoutFormValues } from '../common/types';

/**
 * Adds a workout to the database.
 * @param {IWorkoutFormValues} workout - The workout object.
 * @param {string} handle - The user handle associated with the workout.
 * @return {Promise<string>} A Promise that resolves to the ID of the added workout.
 */
export const addWorkout = (workout: IWorkoutFormValues, handle: string) => {
    return push(
        ref(db, 'workouts'), workout,
    ).then(result => {
        const workoutId = result.key;
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
