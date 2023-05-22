import { Dispatch, SetStateAction } from 'react';
import { User } from 'firebase/auth';

export interface IAppContextValue {
    user: User | null | undefined;
    userData: null;
    setContext: Dispatch<SetStateAction<{ user: User | null | undefined; userData: null; }>>;
}
