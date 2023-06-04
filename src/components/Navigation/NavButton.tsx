import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Flex, Link } from '@chakra-ui/react';

const NavButton: FC<{ color: string, children: string, onClose: () => void }> = ({ color, children, onClose }) => {
    return (
        <Link
            style={{ textDecoration: 'none' }}
            as={NavLink}
            to={children.toLowerCase()}
            p={{ base: '5px', md: '15px 10px' }}
            width='100%'
            textAlign='center'
            fontWeight='bold'
            _activeLink={{ color: color }}
            _focus={{ boxShadow: 'none' }}
            onClick={onClose}
        >
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{ textDecoration: 'none', bg: color, color: 'brand.light' }}
            >
                {children}
            </Flex>
        </Link>
    );
};

export default NavButton;
