import { get, ref, update } from 'firebase/database';
import { db } from '../config/firebase-config';
import moment from 'moment';
import { ITodayLog } from '../common/types';

/**
 * Logs an activity for a user.
 *
 * @param {string} handle - The user's handle.
 * @param {string} activityType - The type of activity.
 * @param {string|number} loggedValue - The value logged for the activity.
 * @return {Promise} A promise that resolves when the activity is logged.
 */
export const logActivity = ({ handle, activityType, loggedValue } :
    { handle: string, activityType: string, loggedValue: string | number }) => {

    const isWorkout = activityType === 'workout' || activityType === 'strength' || activityType === 'stamina' || activityType === 'stretching';

    const todayDate = moment().format('YYYY-MM-DD');

    if (isWorkout) {
        const [name, category, workoutId] = (loggedValue as string).split('_');
        return update(ref(db, `logs/${handle}/${todayDate}/workout`), { name: name, category: category, workoutId: workoutId });
    }

    return get(ref(db, `logs/${handle}/${todayDate}/${activityType}`))
        .then(snapshot => {
            if (!snapshot.exists()) {
                return update(ref(db, `logs/${handle}/${todayDate}`), { [activityType]: loggedValue });
            }

            const updatedValue = snapshot.val() + loggedValue;

            return update(ref(db, `logs/${handle}/${todayDate}`), { [activityType]: updatedValue });
        });
};

/**
 * Removes a logged activity for a user.
 *
 * @param {Object} params - The parameters for unlogging the activity.
 * @param {string} params.handle - The user's handle.
 * @param {string} params.activityType - The type of activity.
 * @return {Promise} A promise that resolves when the activity is unlogged.
 */
export const unlogActivity = ({ handle, activityType } :
    { handle: string, activityType: string }) => {

    const todayDate = moment().format('YYYY-MM-DD');

    return update(ref(db, `logs/${handle}/${todayDate}`), { [activityType]: null });
};

/**
 * Retrieves the log for a specific date for a user.
 *
 * @param {string} handle - The user's handle.
 * @param {string} date - The date for the log in "DD-MM-YYYY" format.
 * @return {Promise} A promise that resolves with the log data for the specified date.
 * @throws {Error} Throws an error if no log exists for the specified date.
 */
export const getUserLogByDate = (handle: string, date: string) => {
    return get(ref(db, `logs/${handle}/${date}`))
        .then(snapshot => {
            if (!snapshot.exists()) {
                throw new Error('No log for this date');
            }

            return snapshot.val();
        });
};

/**
 * Retrieves all logs from database.
 *
 * @return {Promise} A promise that resolves with all the log data.
 * @throws {Error} Throws an error if no logs exist.
 */
export const getAllLogs = (): Promise<{ [key: string]: { [key: string]: ITodayLog }, }> => {
    return get(ref(db, 'logs'))
        .then(snapshot => {
            if (!snapshot.exists()) {
                throw new Error('No log for this date');
            }

            return snapshot.val();
        });
};
