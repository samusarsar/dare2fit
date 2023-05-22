import { FC, ReactElement } from 'react';

import { Box, CloseButton, Flex, Text, useColorModeValue } from '@chakra-ui/react';

import NavButton from './NavButton';

const Sidebar: FC<{ onClose: () => void, display?: object }> = ({ onClose, ...rest }): ReactElement => {
    return (
        <Box
            transition='3s ease'
            bg={useColorModeValue('brand.dark', 'brand.light')}
            borderRight='1px solid white'
            w={{ base: 'full', md: 60 }}
            pos='fixed'
            h='full'
            {...rest}>
            <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
                <Text
                    fontSize='2xl'
                    fontFamily='monospace'
                    fontWeight='bold'color={useColorModeValue('brand.light', 'brand.dark')}>
                    dare2fit
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} color={'white'} />
            </Flex>

            <NavButton color={'brand.red'}>
                Activity
            </NavButton>

            <NavButton color={'brand.blue'}>
                Exercises
            </NavButton>

            <NavButton color={'brand.green'}>
                Goals
            </NavButton>

            <NavButton color={'brand.yellow'}>
                Community
            </NavButton>

        </Box>
    );
};

export default Sidebar;
