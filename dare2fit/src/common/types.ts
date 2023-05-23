import { Dispatch, SetStateAction } from 'react';
import { User } from 'firebase/auth';

export interface IAppContextValue {
    user: User | null | undefined;
    userData: null;
    setContext: Dispatch<SetStateAction<{ user: User | null | undefined; userData: null; }>>;
}

export type IDuration = {
    startDate: string,
    endDate: string,
}

export interface IGoal {
    category: string;
    type: string;
    duration?: IDuration;
    repeatEvery?: string;
    target: number;
    author: string;
    isExpired?: boolean;
    initDate?: string;
    [key: string]: number | string | boolean | undefined | IDuration;
}
