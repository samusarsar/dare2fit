import { Dispatch, SetStateAction } from 'react';
import { User } from 'firebase/auth';
import { UserRoles } from './enums';
import { ExerciseUnits } from './enums';

export interface IAppContextValue {
    user: User | null | undefined;
    userData: IUserData | null;
    setContext?: Dispatch<SetStateAction<{ user: User | null | undefined; userData: IUserData | null; }>>;
}

export type IHealth = {
    weightMetric?: number,
    weightImperial?: number,
    heightMetric?: number,
    heightImperial?: number,
    BMI?: number,
    activityLevel?: number,
    waterGoal?: number,
}

export type ICollection = {
    [key: string]: true,
}

export interface IUserData {
    handle: string,
    uid: string,
    email: string,
    telephone: string,
    createdOn: string,
    firstName: string,
    lastName: string,
    role: UserRoles,
    avatarURL?: string,
    dateOfBirth?: string,
    health?: IHealth,
    friends?: ICollection,
    sentFriendRequests?: ICollection,
    receivedFriendRequests?: ICollection,
    goals?: ICollection,
    workouts?: ICollection,
}

export type IDuration = {
    startDate: string,
    endDate: string,
}

export type ICompetingWith = {
    [key: string]: string,
}

export interface IGoal {
    name?: string;
    goalId: string;
    category: string;
    type: string;
    duration?: IDuration;
    competingWith?: ICompetingWith;
    repeat?: string;
    target: number;
    units: string;
    author: string;
    isExpired?: boolean;
    initDate?: string;
    [key: string]: number | string | boolean | undefined | IDuration | ICompetingWith;
}

// export interface IExercise {
//     exerciseName: string,
//     exerciseId: string,
//     handle: string,
//     type: string,
//     units: string,
//     difficulty: string,
//     createdOn: string,
//     instructions?: string,
//     imageURL?: string
//     lastEdited?: string,
// }

export interface IWorkout {
    workoutId: string,
    author: string,
    createdOn: string,
    workoutName: string,
    category: string,
    difficulty?: string,
    duration?: string,
    calories?: string,
    instructions?: string,
    exercises: IWorkoutExercise[] | []
}

export interface IWorkoutFormValues {
    workoutName: string,
    category: string,
    difficulty?: string,
    duration?: string,
    calories?: string,
    instructions?: string,
    exercises: IWorkoutExercise[] | [], // TODO
}

export interface IExerciseFormValues {
    exerciseName: string,
    type: string,
    muscle: string,
    difficulty: string,
}

export interface ISuggestedExercise {
    difficulty: string,
    equipment: string,
    instructions: string,
    muscle: string,
    name: string,
    type: string,
}

export interface IWorkoutExercise extends ISuggestedExercise {
    units: ExerciseUnits,
    quantity: number,
    weight?: number,
}

export type ILoggedWorkout = {
    name: string,
    category: string,
    [key: string]: string,
};

export interface ITodayLog {
    workout?: ILoggedWorkout;
    walking?: number;
    running?: number;
    cycling?: number;
    swimming?: number;
    [key: string]: string | number | ILoggedWorkout | undefined;
}

export type IGoalProgresses = {
    [key: string]: number,
};
