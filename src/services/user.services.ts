import { get, set, ref, query, equalTo, orderByChild, update } from 'firebase/database';
import { db, storage } from '../config/firebase-config';
import { getDownloadURL, ref as sRef, uploadBytes } from 'firebase/storage';
import { ActivityLevel, FriendRequestType, Gender, UserRoles, WeightGoal } from '../common/enums';
import moment from 'moment';
import { IUserData } from '../common/types';
import { ACTIVITY_LEVEL_DATA, WEIGHT_GOAL_DATA } from '../common/constants';
import { addNotification } from './notification.services';

/**
 * Retrieves a user by their handle.
 * @param {string} handle - The user handle.
 * @return {Promise<IUserData>} A promise that resolves with the user data.
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
 * @return {Promise<IUserData>} A promise that resolves with the user data.
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
 * @return {Promise} A promise that resolves when the user is created.
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
 * @return {Promise<IUserData>} A promise that resolves with the user data.
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
 * @return {Promise<IUserData[] | []>} A promise that resolves with the user data.
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
 * @return {Promise<string[]>} A promise that resolves with the handles of all the user's friends.
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
 * @return {Promise<string[]>} - A Promise that resolves to the friend requests data.
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

/**
 * Sends a friend request from the sender to the recipient.
 * @param {string} sender - The handle of the sender.
 * @param {string} recipient - The handle of the recipient.
 * @return {Promise} - A promise that resolves when the friend request is sent.
 */
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
        })
        .then(() => addNotification(recipient, `${sender} sent you a friend request.`));
};

/**
 * Resolves a friend request by the sender, removing the request from both sender and recipient.
 * @param {string} sender - The handle of the sender.
 * @param {string} recipient - The handle of the recipient.
 * @return {Promise} - A promise that resolves when the request is resolved.
 */
export const resolveRequestBySender = (sender: string, recipient: string) => {
    return update(ref(db, `users/${sender}/sentFriendRequests`), { [recipient]: null })
        .then(() => update(ref(db, `users/${recipient}/receivedFriendRequests`), { [sender]: null }));
};

/**
 * Resolves a friend request by the recipient, removing the request from both recipient and sender.
 * @param {string} recipient - The handle of the recipient.
 * @param {string} sender - The handle of the sender.
 * @return {Promise} - A promise that resolves when the request is resolved.
 */
export const resolveRequestByRecipient = (recipient: string, sender: string) => {
    return update(ref(db, `users/${recipient}/receivedFriendRequests`), { [sender]: null })
        .then(() => update(ref(db, `users/${sender}/sentFriendRequests`), { [recipient]: null }));
};

/**
 * Makes two users friends by accepting a friend request.
 * @param {string} accepting - The handle of the user accepting the request.
 * @param {string} accepted - The handle of the user whose request is accepted.
 * @return {Promise} - A promise that resolves when the users become friends.
 */
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
        })
        .then(() => addNotification(accepted, `${accepting} accepted your friend request!`));
};

/**
 * Unfriends two users by removing the friendship connection between them.
 * @param {string} remover - The handle of the user initiating the unfriending.
 * @param {string} removed - The handle of the user being unfriended.
 * @return {Promise} - A promise that resolves when the users are unfriended.
 */
export const unFriend = (remover: string, removed: string) => {
    return update(ref(db, `users/${remover}/friends`), { [removed]: null })
        .then(() => update(ref(db, `users/${removed}/friends`), { [remover]: null }))
        .then(() => addNotification(removed, `${remover} unfriended you.`));
};

/**
 * Edits the details of a user.
 * @param {object} userDetails - The user details to be edited.
 * @param {string} userDetails.handle - The handle of the user.
 * @param {string} userDetails.propKey - The property key to be edited.
 * @param {string} userDetails.propValue - The new value for the property.
 * @return {Promise} - A promise that resolves when the user details are edited.
 */
export const editUserDetails = ({ handle, propKey, propValue }:
    { handle: string, propKey: string, propValue: string }) => {
    return update(ref(db, `users/${handle}`), {
        [propKey]: propValue,
    });
};

/**
 * Changes the avatar of a user.
 * @param {string} handle - The handle of the user.
 * @param {File} avatar - The new avatar file.
 * @return {Promise} - A promise that resolves when the avatar is changed.
 */
export const changeAvatar = (handle: string, avatar: File) => {
    const fileRef = sRef(storage, `users/${handle}/avatar`);
    return uploadBytes(fileRef, avatar)
        .then(() => getDownloadURL(fileRef))
        .then((url) => editUserDetails({ handle, propKey: 'avatarURL', propValue: url }));
};

/**
 * Edits the health-related numeric data of a user.
 * @param {string} handle - The handle of the user.
 * @param {string} propKey - The key of the property to edit.
 * @param {number} propValue - The new value of the property.
 * @param {boolean} isMetric - Indicates whether the value is in the metric system.
 * @return {Promise} - A promise that resolves when the user's data is updated.
 */
export const editUserHealthNumberData = ({ handle, propKey, propValue, isMetric }:
    { handle: string, propKey: string, propValue: number, isMetric: boolean }) => {
    const coeffMetricToImperial = propKey === 'weight' ?
        2.2 :
        propKey === 'height' ?
            0.033 :
            0.0338;

    const metricValue = isMetric ? propValue.toFixed(1) : (propValue / coeffMetricToImperial).toFixed(1);
    const imperialValue = isMetric ? (propValue * coeffMetricToImperial).toFixed(1) : propValue.toFixed(1);

    return update(ref(db, `users/${handle}/health`), {
        [`${propKey}Metric`]: +metricValue,
        [`${propKey}Imperial`]: +imperialValue,
    });
};

/**
 * Clear the health-related numeric data of a user.
 * @param {string} handle - The handle of the user.
 * @param {string} propKey - The key of the property to clear.
 * @return {Promise} - A promise that resolves when the user's data is cleared.
 */
export const clearUserHealthNumberData = ({ handle, propKey }: { handle: string, propKey: string }) => {
    return update(ref(db, `users/${handle}/health`), {
        [`${propKey}Metric`]: null,
        [`${propKey}Imperial`]: null,
    });
};

/**
 * Edits a specific property of a user's health data.
 * @param {string} handle - The user's handle.
 * @param {string} propKey - The key of the property to edit.
 * @param {string} propValue - The new value for the property.
 * @return {Promise} A Promise that resolves when the update is completed.
 */
export const editUserHealthData = (handle: string, propKey: string, propValue: string) => {
    return update(ref(db, `users/${handle}/health`), {
        [propKey]: propValue ? propValue : null,
    });
};

/**
 * Calculates the Basal Metabolic Rate (BMR) based on user data.
 * @param {IUserData} userData - The user data object.
 * @return {number} The calculated BMR value or 0 if the necessary data is missing.
 */
export const calculateBmr = (userData: IUserData) => {
    const profileActivityLevel = userData.health?.activityLevel || ActivityLevel.noActivity;

    if (userData.health) {
        const { weightMetric, heightMetric, gender } = userData.health;

        if (weightMetric && heightMetric && gender && userData.dateOfBirth) {
            const age = moment().diff(moment(userData.dateOfBirth, 'DD/MM/YYYY'), 'years');
            return gender === Gender.male ? (
                Math.round((10 * weightMetric + 6.25 * heightMetric - 5 * age + 5) * ACTIVITY_LEVEL_DATA[profileActivityLevel].index)
            ) : (
                Math.round((10 * weightMetric + 6.25 * heightMetric - 5 * age - 161) * ACTIVITY_LEVEL_DATA[profileActivityLevel].index)
            );
        }
    }
    return 0;
};

/**
Calculates the daily calorie intake based on the user's data.
@param {IUserData} userData - The user data object.
@return {number} The calculated daily calorie intake 0 if the necessary data is missing.
 */
export const calculateCalories = (userData: IUserData) => {
    const profileWeightGoal = userData!.health?.weightGoal || WeightGoal.maintainWeight;

    return Math.round(calculateBmr(userData) * WEIGHT_GOAL_DATA[profileWeightGoal].index);
};

/**
 * Changes the role of a user.
 * @param {string} handle - The handle of the user.
 * @param {UserRoles} role - The new role of the user.
 * @return {Promise} - A promise that resolves when the user's role is updated.
 */
export const changeUserRole = (handle: string, role: UserRoles) => {
    return update(ref(db, `users/${handle}`), {
        role,
    })
        .then(() => {
            if (role === UserRoles.Admin) {
                addNotification(handle, 'You are now an admin!');
            }
            if (role === UserRoles.Blocked) {
                addNotification(handle, 'You have been blocked.');
            }
        });
};
