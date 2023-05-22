import React from 'react';
import { Outlet } from 'react-router';

import SidebarWithHeader from '../../components/Navigation/SidebarWithHeader.js';
import Footer from '../../components/Base/Footer.jsx';


const RootLayout: React.FC = () => {
    return (
        <SidebarWithHeader>
            <main>
                <Outlet />
                <Footer />
            </main>
        </SidebarWithHeader>
    );
};

export default RootLayout;
