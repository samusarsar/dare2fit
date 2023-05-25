import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { onValue, ref } from 'firebase/database';
import { auth, db } from './config/firebase-config.js';
import { getUserData } from './services/user.services.js';
import { AppContext } from './context/AppContext/AppContext.js';

import RootLayout from './views/RootLayout/RootLayout.jsx';
import LandingPage from './views/LandingPage/LandingPage.jsx';
import ActivityView from './views/ActivityView/ActivityView.jsx';
import ExercisesView from './views/ExercisesView/ExercisesView.jsx';
import GoalsView from './views/GoalsView/GoalsView.jsx';
import CommunityView from './views/CommunityView/CommunityView.jsx';
import ProfileView from './views/ProfileView/ProfileView.jsx';
import UserView from './views/UserView/UserView.jsx';
import MyProfileView from './views/MyProfileView/MyProfileView.jsx';
import NotFound from './views/NotFound/NotFound.jsx';
import LogIn from './views/LogIn/LogIn.jsx';
import SignUp from './views/SignUp/SignUp.js';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.js';

const App: React.FC = () => {
    const [user, loading] = useAuthState(auth);
    const [appState, setAppState] = useState({
        user,
        userData: null,
    });

    if (appState.user !== user) {
        setAppState({
            ...appState,
            user,
        });
    }

    useEffect(() => {
        if (!user) {
            return;
        }

        getUserData(user.uid)
            .then(data => {
                return onValue(ref(db, `users/${Object.keys(data)[0]}`), (snapshot) => {
                    const userData = snapshot.val();
                    setAppState({
                        ...appState,
                        userData: userData,
                    });
                });
            })
            .catch(e => alert(e.message));
    }, [user]);

    if ((!loading && !user) || (!loading && user && appState.userData)) {
        return (
            <>
                {/* {console.log(appState.userData)} */}
                <AppContext.Provider value={{ ...appState, setContext: setAppState }}>
                    <Routes>
                        <Route path='/' element={<RootLayout />}>
                            <Route index element={<LandingPage />} />
                            <Route path='login' element={<LogIn />} />
                            <Route path='signup' element={<SignUp />} />
                            <Route element={<ProtectedRoute />} >
                                <Route path='activity' element={<ActivityView />} />
                                <Route path='exercises' element={<ExercisesView />} />
                                <Route path='goals' element={<GoalsView />} />
                                <Route path='community' element={<CommunityView />} />
                                <Route path='profile/:handle' element={<ProfileView />} />
                            </Route>

                            <Route path='*' element={<NotFound />} />
                        </Route>
                    </Routes>
                </AppContext.Provider>

            </>
        );
    }

    return null;
};

export default App;
