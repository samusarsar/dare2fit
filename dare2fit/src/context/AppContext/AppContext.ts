import { createContext } from 'react';
import { IAppContextValue } from '../../common/types';

export const AppContext = createContext<IAppContextValue>({
    user: null,
    userData: null,
    setContext: () => {
        return;
    },
});
