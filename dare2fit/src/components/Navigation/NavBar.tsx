import React from 'react';
import { NavLink } from 'react-router-dom';

import { Flex, Link, useColorModeValue } from '@chakra-ui/react';
import NavButton from './NavButton';

const NavBar: React.FC = () => {
    return (
        <nav>
            <Flex
                height={'100vh'}
                flexDirection={'column'}
                justifyContent={'space-evenly'}
                alignItems={'center'}
                bg={useColorModeValue('brand.dark', 'brand.light')}>
                <Link as={NavLink} // TODO - replace with profile picture
                    to='profile'
                    color={useColorModeValue('brand.light', 'brand.dark')}>
                        Profile
                </Link>

                <NavButton color={'brand.red'}>
                    Activity
                </NavButton>

                <NavButton color={'brand.blue'}>
                    Exercises
                </NavButton>

                <NavButton color={'brand.green'}>
                    Goals
                </NavButton>

                <NavButton color={'brand.yellow'}>
                    Community
                </NavButton>

            </Flex>
        </nav>
    );
};

export default NavBar;
