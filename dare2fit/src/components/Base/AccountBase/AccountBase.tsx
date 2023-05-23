import { Box, Flex, VStack, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';

/* view component that lays out the LogIn / SignUp components */
const AccountBase: FC<{ children: ReactElement }> = ({ children }): ReactElement => {
    const bg = useColorModeValue('brand.light', 'brand.grey');

    return (
        <Flex
            className='main-view'
            id='log-in-view'
            maxW='container'
            minH='90vh'
            bgSize='cover'
            bgPosition='center'
            align='center'
            justify='center'>
            <Box
                h='fit-content'
                sx={{ bg: 'rgba(2, 24, 37, 0.8)' }}
                rounded='md'
                boxShadow='2xl'
                my={10}>
                <VStack
                    p={10}
                    bg={bg}
                    borderRadius={5}
                >
                    <Heading as='h1' size='lg' color='brand.purple'>dare2fit</Heading>
                    <Text as='cite'>...do you dare2fit...</Text>
                    {children}
                </VStack>
            </Box>
        </Flex>
    );
};

export default AccountBase;
