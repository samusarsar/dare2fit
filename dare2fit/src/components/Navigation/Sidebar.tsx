import { FC, ReactElement } from 'react';

import { Box, CloseButton, Flex, Image, useColorModeValue } from '@chakra-ui/react';

import NavButton from './NavButton';

const Sidebar: FC<{ onClose: () => void, display?: object }> = ({ onClose, ...rest }): ReactElement => {
    const bg = useColorModeValue('brand.white', 'brand.grey');

    return (
        <Box
            transition='3s ease'
            bg={bg}
            borderRightWidth='1px'
            w={{ base: 'full', md: 60 }}
            pos='fixed'
            h='full'
            {...rest}>
            <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
                <Image
                    mt={4}
                    w='200px'
                    // eslint-disable-next-line max-len
                    src='https://firebasestorage.googleapis.com/v0/b/dare2fit-f6eb4.appspot.com/o/assets%2Flogos%2Fdare2fit-05.png?alt=media&token=b30b1374-884a-46c5-b544-3b4d86fe5f41' />
                <CloseButton
                    display={{ base: 'flex', md: 'none' }}
                    onClick={onClose}/>
            </Flex>

            <NavButton color={'brand.red'} onClose={onClose}>
                Activity
            </NavButton>

            <NavButton color={'brand.blue'} onClose={onClose}>
                Workouts
            </NavButton>

            <NavButton color={'brand.green'} onClose={onClose}>
                Goals
            </NavButton>

            <NavButton color={'brand.yellow'} onClose={onClose}>
                Community
            </NavButton>

        </Box>
    );
};

export default Sidebar;
