import React from 'react';
import { Outlet } from 'react-router';

import NavBar from '../../components/Navigation/NavBar.js';
import Footer from '../../components/Base/Footer.jsx';
import { Grid, GridItem } from '@chakra-ui/react';


const RootLayout: React.FC = () => {
    return (
        <main>
            <Grid
                gridTemplateRows={'auto auto 5%'}
                gridTemplateColumns='min-content 1fr'>
                <GridItem
                    rowSpan={{ base: 3, md: 2 }}
                    colSpan={{ base: 2, md: 1 }}>
                    <NavBar />
                </GridItem>

                <GridItem
                    colSpan={{ base: 2, md: 1 }}
                    rowSpan={2}>
                    <Outlet />
                </GridItem>

                <GridItem
                    colSpan={{ base: 2, md: 1 }}>
                    <Footer />
                </GridItem>
            </Grid>
        </main>
    );
};

export default RootLayout;
