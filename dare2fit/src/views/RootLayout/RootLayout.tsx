import React from 'react';
import { Outlet } from 'react-router';

import NavBar from '../../components/Navigation/NavBar.js';
import Footer from '../../components/Base/Footer.jsx';
import { Grid, GridItem } from '@chakra-ui/react';


const RootLayout: React.FC = () => {
    return (
        <main>
            <Grid height={'100vh'}
                templateAreas={`"nav main"
                                "nav footer"`}
                gridTemplateRows={'1fr 5%'}
                gridTemplateColumns='min-content 1fr'>
                <GridItem area={'nav'}>
                    <NavBar />
                </GridItem>

                <GridItem area={'main'}>
                    <Outlet />
                </GridItem>

                <GridItem area={'footer'}>
                    <Footer />
                </GridItem>
            </Grid>
        </main>
    );
};

export default RootLayout;
