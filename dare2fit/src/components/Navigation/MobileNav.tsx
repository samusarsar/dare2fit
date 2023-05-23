import { FC, ReactElement } from 'react';

import { Flex, HStack, IconButton, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { FiBell, FiMenu } from 'react-icons/fi';
import { BsMoon, BsSun } from 'react-icons/bs';


import UserMenu from './UserMenu';

const MobileNav: FC<{ onOpen: () => void }> = ({ onOpen }): ReactElement => {

    const { colorMode, toggleColorMode } = useColorMode();

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
                icon={<FiMenu style={{ color: useColorModeValue('white', 'black') }} />}
            />

            <Text
                display={{ base: 'flex', md: 'none' }}
                fontSize='2xl'
                color={useColorModeValue('brand.light', 'brand.dark')}
                fontFamily='monospace'
                fontWeight='bold'>
                dare2fit
            </Text>

            <HStack spacing={{ base: '0', md: '3' }}>
                <IconButton
                    size='lg'
                    aria-label='toggle theme'
                    variant='ghost'
                    onClick={toggleColorMode}
                    colorScheme={useColorModeValue('black', 'white')}
                    icon={colorMode === 'light' ?
                        <BsMoon style={{ color: 'white' }} /> :
                        <BsSun style={{ color: 'black' }} />}>
                </IconButton>

                <IconButton
                    size='lg'
                    variant='ghost'
                    aria-label='open menu'
                    colorScheme={useColorModeValue('black', 'white')}
                    icon={<FiBell style={{ color: useColorModeValue('white', 'black') }} />}
                />
                <Flex alignItems={'center'}>
                    <UserMenu />
                </Flex>
            </HStack>
        </Flex>
    );
};

export default MobileNav;
