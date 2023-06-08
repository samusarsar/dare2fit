import { endAt, get, limitToFirst, orderByKey, push, query, ref, remove, set, startAt, update } from 'firebase/database';
import { db } from '../config/firebase-config';
import moment from 'moment';
import { ITodayLog } from '../common/types';

/**
 * Retrieves goals by handle from the database.
 * @param {string} handle - The handle of the user.
 * @return {Promise<IGoal[] | []>} - A promise that resolves to the goals data.
 * @throws {Error} - If no goals are found for the given user.
 */
export const getGoalsByHandle = (handle: string) => {
    return get(ref(db, `users/${handle}/goals`))
        .then(snapshot => {
            if (!snapshot.exists()) {
                throw new Error('No goals for this user');
            }

            return snapshot.val();
        })
        .then(data => {
            const promises = Object.keys(data).map(goalId => {
                return getGoalByID(goalId)
                    .catch(() => {
                        removeGoalFromUser(handle, goalId);
                        return null;
                    });
            });
            return Promise.all(promises);
        })
        .then(goals => goals.filter(goal => goal));
};

/**
 * Retrieves a goal by its ID from the database.
 * @param {string} goalId - The ID of the goal.
 * @return {Promise<IGoal>} - A promise that resolves to the goal data.
 * @throws {Error} - If the goal with the given ID does not exist.
 */
export const getGoalByID = (goalId: string) => {
    return get(ref(db, `goals/${goalId}`))
        .then(snapshot => {
            if (!snapshot.exists()) {
                throw new Error('No such goal');
            }

            return snapshot.val();
        });
};

/**
 * Adds a goal to the database.
 * @param {Object} goalData - The data for the goal.
 * @param {string} goalData.author - The author of the goal.
 * @param {string} [goalData.name] - The name of the goal (optional).
 * @param {string} goalData.type - The type of the goal.
 * @param {string} [goalData.repeat] - The repeat value of the goal (optional).
 * @param {string} [goalData.startDate] - The start date of the goal (optional).
 * @param {string} [goalData.endDate] - The end date of the goal (optional).
 * @param {number} goalData.target - The target value of the goal.
 * @param {string} goalData.units - The units of the goal.
 * @return {Promise<string>} - A promise that resolves to the goal ID.
 */
export const addGoal = ({ author, name, type, repeat, startDate, endDate, target, units }:
    { author: string, name?: string, type: string, repeat?: string, startDate?: string, endDate?: string, target: number, units: string }) => {

    const goal = repeat ?
        { category: 'habit', author, type, repeat, target, [author]: 0, units } :
        { category: 'challenge', author, name, type, duration: { startDate, endDate }, target, units };

    return push(ref(db, `goals`), goal)
        .then(result => {
            const goalId = result.key!;
            update(ref(db, `goals/${goalId}`), { 'goalId': goalId });
            addGoalToUser(author, goalId);
            return goalId;
        });
};


/**
 * Adds a goal to the user's goals list.
 * @param {string} handle - The handle of the user.
 * @param {string} goalId - The ID of the goal to add.
 * @return {Promise} - A promise that resolves when the goal is added to the user's goals list.
 */
const addGoalToUser = (handle: string, goalId: string) => {
    return get(ref(db, `users/${handle}/goals`))
        .then(snapshot => {
            if (snapshot.exists()) {
                return update(ref(db, `users/${handle}/goals`), {
                    [goalId]: true,
                });
            } else {
                return set(ref(db, `users/${handle}/goals`), {
                    [goalId]: true,
                });
            }
        });
};

/**
 * Deletes a goal from the database.
 * @param {string} handle - The handle of the user.
 * @param {string} goalId - The ID of the goal to delete.
 * @return {Promise} - A promise that resolves when the goal is deleted from the database.
 */
export const deleteGoal = (handle: string, goalId: string) => {
    return remove(ref(db, `goals/${goalId}`))
        .then(() => removeGoalFromUser(handle, goalId));
};

/**
 * Removes a goal from the user's goals list.
 * @param {string} handle - The handle of the user.
 * @param {string} goalId - The ID of the goal to remove.
 * @return {Promise} - A promise that resolves when the goal is removed from the user's goals list.
 */
export const removeGoalFromUser = (handle: string, goalId: string) => {
    return remove(ref(db, `users/${handle}/goals/${goalId}`));
};

/**
 * Edits a goal in the database.
 * @param {Object} params - The parameters for editing the goal.
 * @param {string} params.goalId - The ID of the goal to edit.
 * @param {string} [params.name] - The updated name of the goal.
 * @param {number} [params.target] - The updated target value of the goal.
 * @return {Promise} - A promise that resolves when the goal is edited in the database.
 */
export const editGoal = ({ goalId, name, target } : { goalId: string, name?: string, target?: number }) => {
    const updates = name && target ?
        { name, target } :
        name ?
            { name } :
            { target };

    return update(ref(db, `goals/${goalId}`), updates);
};

/**
 * Competes on a goal by adding the user's handle to the competingWith list.
 * @param {string} handle - The handle of the user.
 * @param {string} goalId - The ID of the goal to compete on.
 * @return {Promise} - A promise that resolves when the user starts competing on the goal.
 */
export const competeOnGoal = (handle: string, goalId: string) => {
    return update(ref(db, `goals/${goalId}/competingWith`), { [handle]: true })
        .then(() => addGoalToUser(handle, goalId));
};

/**
 * Stops competing on a goal by removing the user's handle from the competingWith list.
 * @param {string} handle - The handle of the user.
 * @param {string} goalId - The ID of the goal to stop competing on.
 * @return {Promise} - A promise that resolves when the user stops competing on the goal.
 */
export const stopCompetingOnGoal = (handle: string, goalId: string) => {
    return update(ref(db, `goals/${goalId}/competingWith`), { [handle]: null })
        .then(() => removeGoalFromUser(handle, goalId));
};

/**
 * Returns the activity logs within the current challenge period.
 * @param {string} handle - The handle of the user.
 * @param {string} startDate - The start date of the period.
 * @param {string} endDate - The end date of the period.
 * @return {Promise<ITodayLog[]>} - A promise that resolves with an array of daily activity logs.
 * @throws {Error} - If no activity logs are found for these dates for this user.
 */
export const getChallengeLogByHandle = (handle: string, startDate: string, endDate: string): Promise<ITodayLog[]> => {
    return get(query(ref(db, `logs/${handle}`), orderByKey(), startAt(startDate), endAt(endDate)))
        .then(snapshot => {
            if (!snapshot.exists()) {
                throw new Error('No logs for these dates.');
            }

            return Object.values(snapshot.val());
        });
};

/**
 * Returns the activity logs within the current habit repeat period.
 * @param {string} handle - The handle of the user.
 * @param {string} repeat - The repeat period.
 * @return {Promise<ITodayLog[]>} - A promise that resolves with an array of daily activity logs.
 * @throws {Error} - If no activity logs are found for these dates for this user.
 */
export const getHabitLogByHandle = (handle: string, repeat: string): Promise<ITodayLog[]> => {
    let startDate: string;
    let endDate: string;

    switch (repeat) {
    case 'daily':
        startDate = moment().format('YYYY-MM-DD');
        endDate = moment().format('YYYY-MM-DD');
        break;
    case 'weekly':
        if (moment().day() === 0) {
            startDate = moment().day(-6).format('YYYY-MM-DD');
        } else {
            startDate = moment().day(1).format('YYYY-MM-DD');
        }
        endDate = moment().format('YYYY-MM-DD');
        break;
    default:
        startDate = moment().date(1).format('YYYY-MM-DD');
        endDate = moment().format('YYYY-MM-DD');
        break;
    }

    return get(query(ref(db, `logs/${handle}`), orderByKey(), startAt(startDate), endAt(endDate)))
        .then(snapshot => {
            if (!snapshot.exists()) {
                throw new Error('No logs for these dates.');
            }

            return Object.values(snapshot.val());
        });
};

/**
 * Returns the activity logs for a habit for the past month.
 * @param {string} handle - The handle of the user.
 * @return {Promise} - A promise that resolves with an object of dates as keys and the daily activity logs.
 * @throws {Error} - If no activity logs are found for these dates for this user.
 */
export const getHabitLogHistory = (handle: string): Promise<({[key:string]: ITodayLog})> => {
    return get(query(ref(db, `logs/${handle}`), orderByKey(), limitToFirst(30)))
        .then(snapshot => {
            if (!snapshot.exists()) {
                throw new Error('No logs for these dates.');
            }

            return snapshot.val();
        });
};

/**
 * Returns the activity logs within the current challenge period.
 * @param {string} handle - The handle of the user.
 * @param {string} startDate - The start date of the period.
 * @param {string} endDate - The end date of the period.
 * @return {Promise} - A promise that resolves with an object of dates as keys and the daily activity logs.
 * @throws {Error} - If no activity logs are found for these dates for this user.
 */
export const getChallengeLogHistory = (handle: string, startDate: string, endDate: string): Promise<({[key:string]: ITodayLog})> => {
    return get(query(ref(db, `logs/${handle}`), orderByKey(), startAt(startDate), endAt(endDate)))
        .then(snapshot => {
            if (!snapshot.exists()) {
                throw new Error('No logs for these dates.');
            }

            return snapshot.val();
        });
};
