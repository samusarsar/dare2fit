import { FC, useContext } from 'react';
import { useNavigate } from 'react-router';

import { Avatar, Box, HStack, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, VStack, useColorModeValue, useToast } from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';

import { AppContext } from '../../context/AppContext/AppContext';
import { logoutUser } from '../../services/auth.services';


const UserMenu: FC = () => {
    const { userData, setContext } = useContext(AppContext);
    const navigate = useNavigate();
    const toast = useToast();

    const handleLogout = () => {
        logoutUser()
            .then(() => {
                setContext({
                    user: null,
                    userData: null,
                });
            })
            .then(() => {
                navigate('../');
                toast({
                    title: 'See you soon!',
                    description: 'You have successfully logged out.',
                    status: 'info',
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                    variant: 'subtle',
                });
            });
    };

    return (
        <Menu>
            <MenuButton
                py={2}
                transition='all 0.3s'
                _focus={{ boxShadow: 'none' }}>
                <HStack>
                    <Avatar
                        size={'sm'}
                    />
                    <VStack
                        display={{ base: 'none', md: 'flex' }}
                        alignItems='flex-start'
                        spacing='1px'
                        ml='2'>
                        <Text
                            fontSize='sm'
                            color={useColorModeValue('brand.light', 'brand.dark')}>
                            {userData?.firstName + ' ' + userData?.lastName}
                        </Text>
                        <Text
                            fontSize='xs'
                            color={useColorModeValue('gray.200', 'gray.700')}>
                            {userData?.role}
                        </Text>
                    </VStack>
                    <Box display={{ base: 'none', md: 'flex' }}>
                        <FiChevronDown style={{ color: 'white' }} />
                    </Box>
                </HStack>
            </MenuButton>
            <MenuList
                bg={useColorModeValue('white', 'gray.900')}
                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                <MenuItem>Profile</MenuItem>
                <MenuDivider />
                <MenuItem color='red.500' onClick={() => handleLogout()}>Log out</MenuItem>
            </MenuList>
        </Menu>
    );
};

export default UserMenu;
