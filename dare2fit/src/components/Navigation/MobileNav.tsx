import { FC, ReactElement } from 'react';

import { Avatar, Box, Flex, HStack, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { FiBell, FiChevronDown, FiMenu } from 'react-icons/fi';

const MobileNav: FC<{ onOpen: () => void }> = ({ onOpen }): ReactElement => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height='20'
            alignItems='center'
            bg={useColorModeValue('brand.dark', 'brand.light')}
            borderBottomWidth='1px'
            justifyContent={{ base: 'space-between', md: 'flex-end' }}>
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                colorScheme={useColorModeValue('white', 'black')}
                onClick={onOpen}
                aria-label='open menu'
                icon={<FiMenu style={{ color: 'white' }} />}
            />

            <Text
                display={{ base: 'flex', md: 'none' }}
                fontSize='2xl'
                color={useColorModeValue('brand.light', 'brand.dark')}
                fontFamily='monospace'
                fontWeight='bold'>
                dare2fit
            </Text>

            <HStack spacing={{ base: '0', md: '6' }}>
                <IconButton
                    size='lg'
                    variant='ghost'
                    colorScheme={useColorModeValue('white', 'black')}
                    aria-label='open menu'
                    icon={<FiBell style={{ color: 'white' }} />}
                />
                <Flex alignItems={'center'}>
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
                                        userRole
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
                </Flex>
            </HStack>
        </Flex>
    );
};

export default MobileNav;
