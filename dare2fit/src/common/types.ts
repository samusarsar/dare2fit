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
