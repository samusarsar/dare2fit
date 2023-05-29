import { FC, ReactElement, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button, Flex, HStack, IconButton, Image, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { FiBell, FiMenu } from 'react-icons/fi';
import { BsMoon, BsSun } from 'react-icons/bs';

import UserMenu from './UserMenu';
import { AppContext } from '../../context/AppContext/AppContext';

const MobileNav: FC<{ onOpen: () => void }> = ({ onOpen }): ReactElement => {
    const { user, userData } = useContext(AppContext);
    const { colorMode, toggleColorMode } = useColorMode();
    const bg = useColorModeValue('brand.white', 'brand.grey');

    const navigate = useNavigate();

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

            <Image
                display={{ base: 'inherit', md: 'none' }}
                w='115px'
                // eslint-disable-next-line max-len
                src='https://firebasestorage.googleapis.com/v0/b/dare2fit-f6eb4.appspot.com/o/assets%2Flogos%2Fdare2fit-05.png?alt=media&token=b30b1374-884a-46c5-b544-3b4d86fe5f41'
                onClick={() => navigate('../../')}/>

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
