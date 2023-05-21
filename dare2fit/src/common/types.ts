import { Dispatch, SetStateAction } from 'react';
import { User } from 'firebase/auth';

export interface IAppContextValue {
    user: User | null | undefined;
    userData: null;
    setContext: Dispatch<SetStateAction<{ user: User | null | undefined; userData: null; }>>;
}

export interface IExercise {
    exerciseName: string,
    exerciseId: string,
    handle: string,
    type: string,
    units: string,
    difficulty: string,
    createdOn: string,
    instructions?: string,
    imageURL?: string
    lastEdited?: string,
}
