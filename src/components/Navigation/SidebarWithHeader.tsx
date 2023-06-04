import React, { ReactElement } from 'react';

import { Box, Drawer, DrawerContent, useColorModeValue, useDisclosure } from '@chakra-ui/react';

import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

const SidebarWithHeader: React.FC<{ children: ReactElement }> = ({ children }): ReactElement => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const bg = useColorModeValue('brand.light', 'brand.dark');

    return (
        <Box minH="100vh" bg={bg}>
            <Sidebar
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }} />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement='left'
                onClose={() => onClose}
                returnFocusOnClose={false}
                onOverlayClick={() => onClose}
                size='full'>
                <DrawerContent>
                    <Sidebar onClose={onClose} />
                </DrawerContent>
            </Drawer>
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p='4'>
                { children }
            </Box>
        </Box>
    );
};

export default SidebarWithHeader;
