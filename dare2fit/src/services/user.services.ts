import { get, set, ref, query, equalTo, orderByChild } from 'firebase/database';
import { db } from '../config/firebase-config';
import { BASE_ROLE } from '../common/constants.js';
import moment from 'moment';

export const getUserByHandle = (handle: string) => {
    return get(ref(db, `users/${handle}`))
        .then(snapshot => {
            if (!snapshot.exists()) {
                throw new Error('No such user.');
            }

            return snapshot.val();
        });
};

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

export const getUserData = (uid: string) => {
    return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)))
        .then(snapshot => {
            if (!snapshot.exists()) {
                throw new Error('No such user.');
            }

            return snapshot.val();
        });
};
