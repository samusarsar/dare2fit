import { equalTo, get, orderByChild, push, query, ref, set, update } from 'firebase/database';
import { getDownloadURL, ref as sRef, uploadBytes } from 'firebase/storage';
import { db, storage } from '../config/firebase-config';
import moment from 'moment';
import { API_NINJAS_KEY, API_NINJAS_URL, TYPES_TO_KM, TYPES_TO_M, TYPES_TO_MINS, TYPES_TO_STEPS } from '../common/constants';
import { IExerciseFormValues } from '../common/types';

/**
 * Adds an exercise to the database.
 * @param {string} exerciseName - The name of the exercise.
 * @param {string} handle - The user handle associated with the exercise.
 * @param {string} type - The type of the exercise.
 * @param {string} difficulty - The difficulty level of the exercise.
 * @param {string} instructions - The instructions for the exercise.
 * @param {File} [image] - Optional image file for the exercise.
 * @return {Promise<string>} A Promise that resolves to the ID of the added exercise.
 */
export const addExercise = (exerciseName: string, handle: string, type: string, difficulty: string, instructions: string, image?: File) => {
    const units =
        TYPES_TO_STEPS.includes(type) ? 'steps' :
            TYPES_TO_KM.includes(type) ? 'km' :
                TYPES_TO_M.includes(type) ? 'm' :
                    TYPES_TO_MINS.includes(type) ? 'mins' :
                        'reps';

    return push(
        ref(db, 'exercises'), { exerciseName, handle, type, units, difficulty, instructions, createdOn: moment(new Date()).format('DD/MM/YYYY HH:mm:ss') })
        .then(result => {
            const exerciseId: string = result.key!;
            if (image) {
                return uploadExerciseImage(image, exerciseId)
                    .then(url => update(ref(db, `exercises/${exerciseId}`), { 'imageURL': url }))
                    .then(() => exerciseId);
            } else {
                return exerciseId;
            }
        })
        .then((exerciseId) => {
            update(ref(db, `exercises/${exerciseId}`), { 'exerciseId': exerciseId });
            addExerciseToUser(handle, exerciseId);
        });
};

/**
 * Adds an exercise to the user's exercise list.
 * @param {string} handle - The user handle.
 * @param {string} exerciseId - The ID of the exercise to add.
 * @return {Promise<void>} A Promise that resolves when the exercise is added to the user's list.
 */
const addExerciseToUser = (handle: string, exerciseId: string) => {
    return get(ref(db, `users/${handle}/exercises`))
        .then(snapshot => {
            if (snapshot.exists()) {
                return update(ref(db, `users/${handle}/exercises`), {
                    [exerciseId]: true,
                });
            } else {
                return set(ref(db, `users/${handle}/exercises`), {
                    [exerciseId]: true,
                });
            }
        });
};

/**
 * Uploads an exercise image to the storage.
 * @param {File} image - The image file to upload.
 * @param {string} exerciseId - The ID of the exercise.
 * @return {Promise<string>} A Promise that resolves to the download URL of the uploaded image.
 */
export const uploadExerciseImage = (image: File, exerciseId: string) => {
    const fileRef = sRef(storage, `exercises/${exerciseId}/image`);
    return uploadBytes(fileRef, image)
        .then(() => getDownloadURL(fileRef));
};

/**
 * Retrieves all exercises created by a given user.
 * @param {string} handle - The creator's handle.
 * @return {Promise<object>} A Promise that resolves to an exercises document containing all exercises created by the passed user.
 */
export const getExercisesByHandle = (handle: string) => {
    return get(query(ref(db, `exercises`), orderByChild('handle'), equalTo(handle)))
        .then(snapshot => {
            if (!snapshot.exists()) {
                throw new Error('No exercises by this users');
            }

            return snapshot.val();
        });
};





export const findExercises = ({ exerciseName, type, muscle, difficulty }: IExerciseFormValues) => {
    return fetch(`${API_NINJAS_URL}?name=${exerciseName}&muscle=${muscle}&type=${type}&difficulty=${difficulty}`, {
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
