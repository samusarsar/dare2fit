import { get, push, ref, remove, set, update } from 'firebase/database';
import { db } from '../config/firebase-config';

/**
 * Retrieves goals by handle from the database.
 * @param {string} handle - The handle of the user.
 * @return {Promise<any>} - A promise that resolves to the goals data.
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
            const promises = Object.keys(data).map(goalId => getGoalByID(goalId));
            return Promise.all(promises);
        });
};

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
        { category: 'challenge', author, name, type, duration: { startDate, endDate }, target, [author]: 0, units };

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
 * @return {Promise<void>} - A promise that resolves when the goal is added to the user's goals list.
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

export const deleteGoal = (handle: string, goalId: string) => {
    return remove(ref(db, `goals/${goalId}`))
        .then(() => removeGoalFromUser(handle, goalId));
};

export const removeGoalFromUser = (handle: string, goalId: string) => {
    return remove(ref(db, `users/${handle}/goals/${goalId}`));
};

export const editGoal = ({ goalId, name, target } : { goalId: string, name?: string, target?: number }) => {
    const updates = name && target ?
        { name, target } :
        name ?
            { name } :
            { target };

    return update(ref(db, `goals/${goalId}`), updates);
};
