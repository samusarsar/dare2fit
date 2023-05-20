import React from 'react';
import { Outlet } from 'react-router';

import NavBar from '../../components/Base/NavBar.jsx';
import Footer from '../../components/Base/Footer.jsx';


const RootLayout: React.FC = () => {
    return (
        <main>
            <NavBar />
            <Outlet />
            <Footer />
        </main>
    );
};

export default RootLayout;
