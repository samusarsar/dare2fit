import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Link, useColorModeValue } from '@chakra-ui/react';

const NavButton: FC<{ color: string, children: string }> = ({ color, children }) => {
    return (
        <Link as={NavLink}
            to={children.toLowerCase()}
            p={{ base: '5px', md: '15px 10px' }}
            width='100%'
            textAlign='center'
            fontWeight={{ md: 'bold' }}
            fontSize={{ base: '0.8em', md: '1em' }}
            color={useColorModeValue('brand.light', 'brand.dark')}
            _activeLink={{ color: color }}
            _hover={{ textDecoration: 'none', bg: color, color: 'brand.light' }}>
            {children}
        </Link>
    );
};

export default NavButton;
