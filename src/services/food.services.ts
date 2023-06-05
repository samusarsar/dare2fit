import { API_NINJAS_KEY, API_NINJAS_FOOD } from '../common/constants';
import { IFood } from '../common/types';

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
