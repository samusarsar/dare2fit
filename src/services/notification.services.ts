import { ref, update } from '@firebase/database';
import { db } from '../config/firebase-config';
import moment from 'moment';

/**
 * Adds a notification to the user's notifications list.
 * @param {string} handle - The handle of the user.
 * @param {string} content - The content of the notification.
 * @return {Promise} - This function does not return a value.
 */
export const addNotification = (handle: string, content: string) => {
    return update(ref(db, `users/${handle}/notifications`), { [moment().unix()]: content });
};

/**
 * Removes a notification from the user's notifications list.
 * @param {string} handle - The handle of the user.
 * @param {string} notificationTimestamp - The timestamp of the notification to remove.
 * @return {PromiseRejectedResult} - This function does not return a value.
 */
export const removeNotification = (handle: string, notificationTimestamp: string) => {
    return update(ref(db, `users/${handle}/notifications`), { [notificationTimestamp]: null });
};
