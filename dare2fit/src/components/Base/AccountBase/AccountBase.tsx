import { Box, Flex, VStack, useColorModeValue, Image } from '@chakra-ui/react';
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
                    <Image
                        w='200px'
                        // eslint-disable-next-line max-len
                        src='https://firebasestorage.googleapis.com/v0/b/dare2fit-f6eb4.appspot.com/o/assets%2Flogos%2Fdare2fit-05.png?alt=media&token=b30b1374-884a-46c5-b544-3b4d86fe5f41' />
                    {children}
                </VStack>
            </Box>
        </Flex>
    );
};

export default AccountBase;
