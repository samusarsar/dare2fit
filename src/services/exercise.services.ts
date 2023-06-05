import { API_NINJAS_KEY, API_NINJAS_EXERCISES } from '../common/constants';
import { IExerciseFormValues, ISuggestedExercise } from '../common/types';

/**
 * Retrieves all exercises from API Ninjas, that match the search criteria.
 * @param {object} searchParams The search parameters.
 * @return {Promise<ISuggestedExercise[]>} A Promise that resolves to array of exercise objects.
 */
export const findExercises = ({ exerciseName, type, muscle, difficulty }: IExerciseFormValues): Promise<ISuggestedExercise[]> => {
    return fetch(`${API_NINJAS_EXERCISES}?name=${exerciseName}&muscle=${muscle}&type=${type}&difficulty=${difficulty}`, {
        headers: {
            'X-Api-Key': API_NINJAS_KEY,
        } })
        .then(response => {
            if (!response.ok) {
                throw new Error('Can not get exercises');
            }
            return response.json() as Promise<ISuggestedExercise[]>;
        })
        .then(data => {
            return [...new Map(data.map((e: ISuggestedExercise) => [e.name, e])).values()]; // filter out repeating exercises from API NINJAS
        });
};
