import { get, push, ref, set, update } from 'firebase/database';
import { getDownloadURL, ref as sRef, uploadBytes } from 'firebase/storage';
import { db, storage } from '../config/firebase-config';
import moment from 'moment';

export const addExercise = (exerciseName: string, handle: string, type: string, difficulty: string, instructions: string, image?: File) => {
    return push(
        ref(db, 'exercises'), { exerciseName, handle, type, difficulty, instructions, createdOn: moment(new Date()).format('DD/MM/YYYY HH:mm:ss') })
        .then(result => {
            const exerciseId: string = result.key!;
            update(ref(db, `exercises/${exerciseId}`), { 'exerciseId': exerciseId });
            addExerciseToUser(handle, exerciseId);
            return exerciseId;
        })
        .then((exerciseId) => {
            if (image) {
                return uploadExerciseImage(handle, image, exerciseId)
                    .then(url => update(ref(db, `exercises/${exerciseId}`), { 'imageURL': url }));
            }

            return null;
        });
};

// TODO: fix exerciseId type
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

export const uploadExerciseImage = (handle: string, image: File, exerciseId: string) => {
    const fileRef = sRef(storage, `exercises/${exerciseId}/image`);
    return uploadBytes(fileRef, image)
        .then(() => getDownloadURL(fileRef));
};
