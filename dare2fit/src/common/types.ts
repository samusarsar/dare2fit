import { Dispatch, SetStateAction } from 'react';
import { User } from 'firebase/auth';
import { Roles } from './enums';

export interface IAppContextValue {
    user: User | null | undefined;
    userData: IUserData | null;
    setContext: Dispatch<SetStateAction<{ user: User | null | undefined; userData: null; }>>;
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

export interface IUserData {
    handle: string,
    uid: string,
    email: string,
    telephone: string,
    createdOn: string,
    firstName: string,
    lastName: string,
    role: Roles,
    avatarURL?: string,
    dateOfBirth?: string,
    health?: IHealth,
}

export type IDuration = {
    startDate: string,
    endDate: string,
}

export interface IGoal {
    name?: string;
    goalId: string;
    category: string;
    type: string;
    duration?: IDuration;
    repeat?: string;
    target: number;
    units: string;
    author: string;
    isExpired?: boolean;
    initDate?: string;
    [key: string]: number | string | boolean | undefined | IDuration;
}
