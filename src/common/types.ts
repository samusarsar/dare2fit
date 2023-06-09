import { Dispatch, SetStateAction } from 'react';
import { User } from 'firebase/auth';
import { ActivityLevel, Gender, UserRoles, WeightGoal } from './enums';
import { ExerciseUnits } from './enums';

export interface IAppState {
    user: User | null | undefined;
    userData: IUserData | null;
}

export interface IAppContextValue extends IAppState {
    setContext: Dispatch<SetStateAction<{ user: User | null | undefined; userData: IUserData | null; }>>;
}

export type IHealth = {
    weightMetric?: number,
    weightImperial?: number,
    heightMetric?: number,
    heightImperial?: number,
    gender?: Gender,
    BMI?: number,
    activityLevel?: ActivityLevel,
    weightGoal?: WeightGoal,
    waterTargetMetric?: number,
    waterTargetImperial?: number,
}

export type ICollection = {
    [key: string]: true,
}

export type INotifications = {
    [key: string]: string,
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
    notifications?: INotifications,
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
    exercises: IWorkoutExercise[] | [],
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
    sets?: number,
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
    calories?: number;
    [key: string]: string | number | ILoggedWorkout | undefined;
}

export type IGoalProgresses = {
    [key: string]: number,
};


export type IFood = {
    name: string,
    calories: number,
    serving_size_g: number,
    fat_total_g: number,
    fat_saturated_g: number,
    protein_g: number,
    sodium_mg: number,
    potassium_mg: number,
    cholesterol_mg: number,
    carbohydrates_total_g: number,
    fiber_g: number,
    sugar_g: number,
};
