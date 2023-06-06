import moment from 'moment';
import { API_NINJAS_KEY, API_NINJAS_FOOD } from '../common/constants';
import { IFood } from '../common/types';
import { get, ref, update } from 'firebase/database';
import { db } from '../config/firebase-config';

/**
 * Retrieves all food from API Ninjas, that match the search criteria.
 * @param {object} searchFood The search parameters.
 * @return {Promise} A Promise that resolves to array of food objects.
 */
export const findFood = (searchFood: string): Promise<IFood[] | []> => {
    return fetch(`${API_NINJAS_FOOD}?query=${searchFood}`, {
        headers: {
            'X-Api-Key': API_NINJAS_KEY,
        } })
        .then(response => {
            if (!response.ok) {
                throw new Error('Can not get exercises');
            }
            return response.json();
        });
};

export const logFood = (handle: string, foodName: string, calories: number) => {
    const todayDate = moment().format('YYYY-MM-DD');

    return get(ref(db, `logs/${handle}/${todayDate}/calories/${foodName}`))
        .then(snapshot => {
            if (!snapshot.exists()) {
                return update(ref(db, `logs/${handle}/${todayDate}/calories`), { [foodName]: calories });
            }

            const updatedCalories = snapshot.val() + calories;

            return update(ref(db, `logs/${handle}/${todayDate}/calories`), { [foodName]: updatedCalories });
        });
};
