import { get, set, ref, query, equalTo, orderByChild } from 'firebase/database';
import { db } from '../config/firebase-config';
import { BASE_ROLE } from '../common/constants.js';
import moment from 'moment';

/**
 * Retrieves user data by handle.
 * @param {string} handle - The user handle.
 * @return {Promise<object>} A Promise that resolves to the user data.
 * @throws {Error} If no user exists with the given handle.
 */
export const getUserByHandle = (handle: string) => {
    return get(ref(db, `users/${handle}`))
        .then(snapshot => {
            if (!snapshot.exists()) {
                throw new Error('No such user.');
            }

            return snapshot.val();
        });
};

/**
 * Creates a new user.
 * @param {string} handle - The user handle.
 * @param {string} uid - The user ID.
 * @param {string | null} email - The user email.
 * @param {string} firstName - The user's first name.
 * @param {string} lastName - The user's last name.
 * @return {Promise<void>} A Promise that resolves when the user is created.
 */
export const createUser = (handle: string, uid: string, email: string | null, firstName: string, lastName: string) => {
    const createdOn = moment(new Date()).format('DD/MM/YYYY HH:mm:ss');
    return set(ref(db, `users/${handle}`), {
        handle,
        uid,
        email,
        createdOn: createdOn,
        firstName,
        lastName,
        role: BASE_ROLE,
    });
};

/**
 * Retrieves user data by UID.
 * @param {string} uid - The user UID.
 * @return {Promise<object>} A Promise that resolves to the user data.
 * @throws {Error} If no user exists with the given UID.
 */
export const getUserData = (uid: string) => {
    return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)))
        .then(snapshot => {
            if (!snapshot.exists()) {
                throw new Error('No such user.');
            }

            return snapshot.val();
        });
};
