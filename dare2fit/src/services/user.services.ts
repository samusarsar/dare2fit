import { get, set, ref, query, equalTo, orderByChild, update } from 'firebase/database';
import { db, storage } from '../config/firebase-config';
import { getDownloadURL, ref as sRef, uploadBytes } from 'firebase/storage';
import { FriendRequestType, UserRoles } from '../common/enums';
import moment from 'moment';
import { IUserData } from '../common/types';

/**
 * Retrieves a user by their handle.
 * @param {string} handle - The user handle.
 * @return {Promise<any>} A promise that resolves with the user data.
 * @throws {Error} If the user doesn't exist.
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
 * Retrieves a user by their telephone.
 * @param {string} telephone - The user telephone.
 * @return {Promise<any>} A promise that resolves with the user data.
 * @throws {Error} If the user doesn't exist.
 */
export const getUserByTelephone = (telephone: string) => {
    return get(query(ref(db, `users`), orderByChild('telephone'), equalTo(telephone)))
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
 * @param {string} email - The user email.
 * @param {string} telephone - The user email.
 * @param {string} firstName - The user's first name.
 * @param {string} lastName - The user's last name.
 * @return {Promise<void>} A promise that resolves when the user is created.
 */
export const createUser = (handle: string, uid: string, email: string, telephone: string, firstName: string, lastName: string): Promise<void> => {
    const createdOn = moment(new Date()).format('DD/MM/YYYY HH:mm:ss');
    return set(ref(db, `users/${handle}`), {
        handle,
        uid,
        email,
        telephone,
        createdOn: createdOn,
        firstName,
        lastName,
        role: UserRoles.Base,
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
export const getAllUsers = (): Promise<IUserData[]> => {
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

/**
 * Retrieves the friend requests for a user.
 * @param {string} handle - The handle of the user.
 * @param {FriendRequestType} type - The type of friend request to retrieve.
 * @return {Promise<any>} - A Promise that resolves to the friend requests data.
 * @throws {Error} - If no friend requests are found for the user.
 */
export const getUserFriendRequests = (handle: string, type: FriendRequestType) => {
    return get(ref(db, `users/${handle}/${type}FriendRequests`))
        .then(snapshot => {
            if (!snapshot.exists()) {
                throw new Error('No such friend requests found for this user');
            }

            return snapshot.val();
        });
};

export const sendFriendRequest = (sender: string, recipient: string) => {
    return get(ref(db, `users/${sender}/sentFriendRequests`))
        .then(snapshot => {
            if (snapshot.exists()) {
                update(ref(db, `users/${sender}/sentFriendRequests`), { [recipient]: true });
            } else {
                set(ref(db, `users/${sender}/sentFriendRequests`), { [recipient]: true });
            }
        })
        .then(() => get(ref(db, `users/${recipient}/receivedFriendRequests`)))
        .then(snapshot => {
            if (snapshot.exists()) {
                update(ref(db, `users/${recipient}/receivedFriendRequests`), { [sender]: true });
            } else {
                set(ref(db, `users/${recipient}/receivedFriendRequests`), { [sender]: true });
            }
        });
};

export const resolveRequestBySender = (sender: string, recipient: string) => {
    return update(ref(db, `users/${sender}/sentFriendRequests`), { [recipient]: null })
        .then(() => update(ref(db, `users/${recipient}/receivedFriendRequests`), { [sender]: null }));
};

export const resolveRequestByRecipient = (recipient: string, sender: string) => {
    return update(ref(db, `users/${recipient}/receivedFriendRequests`), { [sender]: null })
        .then(() => update(ref(db, `users/${sender}/sentFriendRequests`), { [recipient]: null }));
};

export const makeFriends = (accepting: string, accepted: string) => {
    return resolveRequestByRecipient(accepting, accepted)
        .then(() => get(ref(db, `users/${accepting}/friends`)))
        .then(snapshot => {
            if (snapshot.exists()) {
                update(ref(db, `users/${accepting}/friends`), { [accepted]: true });
            } else {
                set(ref(db, `users/${accepting}/friends`), { [accepted]: true });
            }
        })
        .then(() => get(ref(db, `users/${accepted}/friends`)))
        .then(snapshot => {
            if (snapshot.exists()) {
                update(ref(db, `users/${accepted}/friends`), { [accepting]: true });
            } else {
                set(ref(db, `users/${accepted}/friends`), { [accepting]: true });
            }
        });
};

export const unFriend = (remover: string, removed: string) => {
    return update(ref(db, `users/${remover}/friends`), { [removed]: null })
        .then(() => update(ref(db, `users/${removed}/friends`), { [remover]: null }));
};

export const editUserDetails = ({ handle, propKey, propValue }:
    { handle: string, propKey: string, propValue: string }) => {
    return update(ref(db, `users/${handle}`), {
        [propKey]: propValue,
    });
};

export const changeAvatar = (handle: string, avatar: File) => {
    const fileRef = sRef(storage, `users/${handle}/avatar`);
    return uploadBytes(fileRef, avatar)
        .then(() => getDownloadURL(fileRef))
        .then((url) => editUserDetails({ handle, propKey: 'avatarURL', propValue: url }));
};

export const editUserHealthNumberData = ({ handle, propKey, propValue, isMetric }:
    { handle: string, propKey: string, propValue: number, isMetric: boolean }) => {
    const coeffMetricToImperial = propKey === 'weight' ? 2.2 : 0.033;

    const metricValue = isMetric ? propValue.toFixed(1) : (propValue / coeffMetricToImperial).toFixed(1);
    const imperialValue = isMetric ? (propValue * coeffMetricToImperial).toFixed(1) : propValue.toFixed(1);

    return update(ref(db, `users/${handle}/health`), {
        [`${propKey}Metric`]: +metricValue,
        [`${propKey}Imperial`]: +imperialValue,
    });
};

export const changeUserRole = (handle: string, role: UserRoles) => {
    return update(ref(db, `users/${handle}`), {
        role,
    });
};
