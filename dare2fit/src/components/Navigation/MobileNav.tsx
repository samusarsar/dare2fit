import { FC, ReactElement, useContext } from 'react';
import { Link } from 'react-router-dom';

import { Button, Flex, HStack, IconButton, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { FiBell, FiMenu } from 'react-icons/fi';
import { BsMoon, BsSun } from 'react-icons/bs';

import UserMenu from './UserMenu';
import { AppContext } from '../../context/AppContext/AppContext';

const MobileNav: FC<{ onOpen: () => void }> = ({ onOpen }): ReactElement => {
    const { user, userData } = useContext(AppContext);
    const { colorMode, toggleColorMode } = useColorMode();
    const bg = useColorModeValue('brand.white', 'brand.grey');

    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height='20'
            alignItems='center'
            bg={bg}
            borderBottomWidth='1px'
            justifyContent={{ base: 'space-between', md: 'flex-end' }}>
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                aria-label='open menu'
                icon={<FiMenu />}
            />

            <Text
                display={{ base: 'flex', md: 'none' }}
                fontSize='2xl'
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
                    icon={colorMode === 'light' ? <BsMoon /> : <BsSun />}>
                </IconButton>


                {(user && userData) ? (
                    <>
                        <IconButton
                            size='lg'
                            variant='ghost'
                            aria-label='open menu'
                            icon={<FiBell />}
                        />
                        <Flex alignItems={'center'}>
                            <UserMenu />
                        </Flex>
                    </>
                ) : (
                    <Button as={Link} to='/login' colorScheme='purple'>Log in</ Button>
                )}

            </HStack>
        </Flex>
    );
};

export default MobileNav;
