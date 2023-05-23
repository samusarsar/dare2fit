import { FC } from 'react';

import { Avatar, Box, HStack, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';

const UserMenu: FC = () => {
    return (
        <Menu>
            <MenuButton
                py={2}
                transition='all 0.3s'
                _focus={{ boxShadow: 'none' }}>
                <HStack>
                    <Avatar
                        size={'sm'}
                        src={
                            // eslint-disable-next-line max-len
                            'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                        }
                    />
                    <VStack
                        display={{ base: 'none', md: 'flex' }}
                        alignItems='flex-start'
                        spacing='1px'
                        ml='2'>
                        <Text
                            fontSize='sm'
                            color={useColorModeValue('brand.light', 'brand.dark')}>
                            User Name
                        </Text>
                        <Text
                            fontSize='xs'
                            color={useColorModeValue('gray.200', 'gray.700')}>
                            user role
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
                <MenuItem>Sign out</MenuItem>
            </MenuList>
        </Menu>

    );
};

export default UserMenu;
