import React from 'react';
import { Route, Routes } from 'react-router-dom';

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

const App: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<RootLayout />}>
                    <Route index element={<LandingPage />} />
                    <Route path='login' element={<LogIn />} />
                    <Route path='signup' element={<SignUp />} />
                    <Route path='activity' element={<ActivityView />} />
                    <Route path='exercises' element={<ExercisesView />} />
                    <Route path='goals' element={<GoalsView />} />
                    <Route path='community' element={<CommunityView />} />
                    <Route path='profile' element={<ProfileView />}>
                        <Route index element={<MyProfileView />} />
                        <Route path=':user' element={<UserView />} />
                    </Route>
                    <Route path='*' element={<NotFound />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
