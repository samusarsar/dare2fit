import { Dispatch, SetStateAction } from 'react';
import { User } from 'firebase/auth';

interface iAppContextValue {
    user: User | null | undefined;
    userData: null;
    setContext: Dispatch<SetStateAction<{ user: User | null | undefined; userData: null; }>>;
}

export default iAppContextValue;
