import React from 'react';
import { Route, Routes } from 'react-router-dom';

import RootLayout from './views/RootLayout/RootLayout.jsx';
import LandingPage from './views/LandingPage/LandingPage.jsx';
import ActivityView from './views/ActivityView/ActivityView.jsx';
import ExercisesView from './views/ExercisesView/ExercisesView.jsx';
import GoalsView from './views/GoalsView/GoalsView.jsx';
import CommunityView from './views/CommunityView/CommunityView.js';
import ProfileView from './views/ProfileView/ProfileView.js';
import UserView from './views/UserView/UserView.js';
import MyProfileView from './views/MyProfileView/MyProfileView.js';
import NotFound from './views/NotFound/NotFound.js';

const App: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<RootLayout />}>
                    <Route index element={<LandingPage />} />
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
