import { createContext } from 'react';
import iAppContextValue from '../../common/interfaces/iAppContextValue';

export const AppContext = createContext<iAppContextValue>({
    user: null,
    userData: null,
    setContext: () => {
        return;
    },
});
