import { Dispatch, SetStateAction } from 'react';
import { User } from 'firebase/auth';
import { Roles } from './constants';

export interface IAppContextValue {
    user: User | null | undefined;
    userData: IUserData | null;
    setContext: Dispatch<SetStateAction<{ user: User | null | undefined; userData: null; }>>;
}

export interface IUserData {
    handle: string,
    uid: string,
    email: string | null,
    createdOn: string,
    firstName: string,
    lastName: string,
    role: Roles,
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

export interface IWorkoutFormValues {
    workoutName: string,
    category: string,
    duration: string,
    difficulty: string,
    calories: string,
    instructions: string,
    exercises: IWorkoutExercise[] | [], // TODO
}

export interface IExerciseFormValues {
    exerciseName: string,
    type: string,
    muscle: string,
    difficulty: string,
}

export interface ISuggestedExercise { // TODO
    difficulty: string,
    equipment: string,
    instructions: string,
    muscle: string,
    name: string,
    type: string,
}

export interface IWorkoutExercise extends ISuggestedExercise {
    quantity: number,
    weight?: number,
}
