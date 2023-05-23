import { equalTo, get, orderByChild, query, ref } from 'firebase/database';
import { db } from '../config/firebase-config';

export const getGoalsByHandle = (handle: string) => {
    return get(query(ref(db, `goals`), orderByChild('author'), equalTo(handle)))
        .then((snapshot) => {
            if (!snapshot.exists()) {
                throw new Error('No goals by this user');
            }

            return snapshot.val();
        });
};
