import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, HStack, Icon, Image, Stack, Text, useToast } from '@chakra-ui/react';
import { BsFacebook, BsTwitter, BsLinkedin } from 'react-icons/bs';

const Footer: FC = (): ReactElement => {
    const toast = useToast();

    const handleSocials = (network: string) => {
        toast({
            title: `We are not on ${network} yet!`,
            description: 'Stay tuned and follow us when we become live!',
            status: 'info',
            duration: 3000,
            isClosable: true,
            position: 'top',
            variant: 'subtle',
        });
    };

    return (
        <Box color='gray.500' borderTopWidth={1} borderStyle='solid' mt={10}>
            <Container
                as={Stack}
                maxW='6xl'
                pt={5}
                spacing={4}
                justify='center'
                align='center'>
                <Image
                    // eslint-disable-next-line max-len
                    src='https://firebasestorage.googleapis.com/v0/b/dare2fit-f6eb4.appspot.com/o/assets%2Flogos%2Fdare2fit-05.png?alt=media&token=b30b1374-884a-46c5-b544-3b4d86fe5f41&_gl=1*c93heq*_ga*MjExMzk5MTA5MC4xNjgzMjcwMjg1*_ga_CW55HF8NVT*MTY4NTYyNzA4OC42Ni4xLjE2ODU2Mjc2ODMuMC4wLjA.'
                    h='40px' />
            </Container>
            <HStack justify='center' mt={2} flexWrap='wrap'>
                <Link to='/'>Home</Link>
                <Link to='activity'>Activity</Link>
                <Link to='workouts'>Workouts</Link>
                <Link to='goals'>Goals</Link>
                <Link to='community'>Community</Link>
                <Link to='about'>About</Link>
            </HStack>
            <Box>
                <Container
                    as={Stack}
                    maxW='6xl'
                    py={4}
                    direction={{ base: 'column', md: 'row' }}
                    spacing={4}
                    justify={{ base: 'center', md: 'space-between' }}
                    align={{ base: 'center', md: 'center' }}>
                    <Text>© 2023 Team 16 - dare2fit. All rights reserved</Text>
                    <Stack direction='row' spacing={6}>
                        <Icon as={BsFacebook} bg='transparent' onClick={() => handleSocials('Facebook')}/>
                        <Icon as={BsTwitter} bg='transparent' onClick={() => handleSocials('Twitter')}/>
                        <Icon as={BsLinkedin} bg='transparent' onClick={() => handleSocials('LinkedIn')}/>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
};

export default Footer;
