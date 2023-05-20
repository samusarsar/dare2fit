import React from 'react';
import { Outlet } from 'react-router';

const ProfileView: React.FC = () => {
    return (
        <div>
            <p>Profile View</p>
            <Outlet/>
        </div>
    );
};

export default ProfileView;
