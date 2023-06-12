import { FC } from 'react';
import { Outlet } from 'react-router';

import SidebarWithHeader from '../../components/Navigation/SidebarWithHeader';
import Footer from '../../components/Base/Footer/Footer';
import { Box } from '@chakra-ui/react';


const RootLayout: FC = () => {
    return (
        <SidebarWithHeader>
            <main>
                <Box minH='100vh'>
                    <Outlet />
                </Box>
                <Footer />
            </main>
        </SidebarWithHeader>
    );
};

export default RootLayout;
