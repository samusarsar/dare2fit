import { get, set, ref, query, equalTo, orderByChild } from 'firebase/database';
import { db } from '../config/firebase-config';
import { FriendRequestType, Roles } from '../common/enums';
import moment from 'moment';

/**
 * Retrieves a user by their handle.
 * @param {string} handle - The user handle.
 * @return {Promise<any>} A promise that resolves with the user data.
 * @throws {Error} If the user doesn't exist.
 */
export const getUserByHandle = (handle: string): Promise<any> => {
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
 * @param {string} uid - The user UID.
 * @param {string | null} email - The user email.
 * @param {string} firstName - The user's first name.
 * @param {string} lastName - The user's last name.
 * @return {Promise<void>} A promise that resolves when the user is created.
 */
export const createUser = (handle: string, uid: string, email: string | null, firstName: string, lastName: string): Promise<void> => {
    const createdOn = moment(new Date()).format('DD/MM/YYYY HH:mm:ss');
    return set(ref(db, `users/${handle}`), {
        handle,
        uid,
        email,
        createdOn: createdOn,
        firstName,
        lastName,
        role: Roles.Base,
    });
};

/**
 * Retrieves user data by their UID.
 * @param {string} uid - The user UID.
 * @return {Promise<any>} A promise that resolves with the user data.
 * @throws {Error} If the user doesn't exist.
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

/**
 * Retrieves all users.
 * @return {Promise<any>} A promise that resolves with the user data.
 * @throws {Error} If no users are found.
 */
export const getAllUsers = () => {
    return get(ref(db, `users`))
        .then(snapshot => {
            if (!snapshot.exists()) {
                throw new Error('No users found');
            }

            return snapshot.val();
        });
};

/**
 * Retrieves all friends of a user by the user's handle.
 * @param {string} handle - The user handle.
 * @return {Promise<any>} A promise that resolves with the handles of all the user's friends.
 * @throws {Error} If the user doesn't have friends.
 */
export const getUserFriends = (handle: string) => {
    return get(ref(db, `users/${handle}/friends`))
        .then(snapshot => {
            if (!snapshot.exists()) {
                throw new Error('No friends found for this user');
            }

            return snapshot.val();
        });
};

export const getUserFriendRequests = (handle: string, type: FriendRequestType) => {
    return get(ref(db, `users/${handle}/${type}FriendRequests`))
        .then(snapshot => {
            if (!snapshot.exists()) {
                throw new Error('No such friend requests found for this user');
            }

            return snapshot.val();
        });
};
