/* eslint-disable max-len */
import { FC, ReactElement } from 'react';
import { Card, CardBody, Image, Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button, HStack, VStack, Icon, Link, Skeleton } from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlinePhone, AiOutlineMail } from 'react-icons/ai';

const Team: FC = (): ReactElement => {
    const [loaded1, setLoaded1] = useState(false);
    const [loaded2, setLoaded2] = useState(false);

    return (
        <VStack gap={4} w='100%'>
            <Heading as='h2' display='flex'>Meet the dare2fit team!</Heading>
            <Text>Following the astounding success of <b>GIFlamingo</b> and <b>Interiorum</b> - the infamous Team 16 graduated to bigger and better endeavours, bringing you dare2fit!</Text>
            <HStack justify='center' gap={10} flexWrap='wrap' spacing={0}>
                <Card maxW='sm'>
                    <CardBody>
                        <Skeleton isLoaded={loaded1}>
                            <Image
                                src='https://cdn.discordapp.com/attachments/1095331992821846110/1102598998830887024/P1388641.jpg'
                                alt='Simona Ilcheva'
                                borderRadius='lg'
                                h={{ base: '200px', md: '300px' }}
                                w='xs'
                                fit='cover'
                                transition='0.4s ease-in-out'
                                filter='none'
                                _hover={{ filter: 'grayscale(100%)' }}
                                onLoad={() => setLoaded1(true)}
                            />
                        </Skeleton>
                        <Stack mt='6' spacing='3'>
                            <Heading size='md'>Simona Ilcheva</Heading>
                            <Text>- dare2fit CEO</Text>
                            <Text>- dare2fit CTO</Text>
                            <Text>- dare2fit COO</Text>
                            <Text>- Programmer</Text>
                            <Text>- Ideator</Text>
                        </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter ml='auto' mr='auto' h='80px'>
                        <ButtonGroup spacing='2'>
                            <Link href='tel:1231231234' data-rel='external'>
                                <Button variant='solid' colorScheme='teal' transition='.2s ease-in-out' _hover={{ mt: '-1.5' }}>
                                    <Icon as={AiOutlinePhone} mr={2}/>Call
                                </Button>
                            </Link>
                            <Link href='mailto:simona@dare2fit.bg' data-rel='external'>
                                <Button variant='ghost' colorScheme='pink' transition='.2s ease-in-out' _hover={{ mt: '-1.5' }}>
                                    <Icon as={AiOutlineMail} mr={2}/>Email
                                </Button>
                            </Link>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
                <Card maxW='sm'>
                    <CardBody>
                        <Skeleton isLoaded={loaded2}>
                            <Image
                                src='https://media.licdn.com/dms/image/C4D03AQF-Ex2F6ps6IQ/profile-displayphoto-shrink_800_800/0/1606661380234?e=1688601600&v=beta&t=Cpuz_66ZcC-5RnTBuciQF3b2Glzuloo6YPAxgu2p508'
                                alt='Samuil Sarandev'
                                borderRadius='lg'
                                h={{ base: '200px', md: '300px' }}
                                w='xs'
                                fit='cover'
                                transition='0.4s ease-in-out'
                                _hover={{ filter: 'grayscale(100%)' }}
                                onLoad={() => setLoaded2(true)}
                            />
                        </Skeleton>
                        <Stack mt='6' spacing='3'>
                            <Heading size='md'>Samuil Sarandev</Heading>
                            <Text>- dare2fit CEO</Text>
                            <Text>- dare2fit CTO</Text>
                            <Text>- dare2fit COO</Text>
                            <Text>- Programmer</Text>
                            <Text>- Ideator</Text>
                        </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter ml='auto' mr='auto' h='80px'>
                        <ButtonGroup spacing='2'>
                            <Link href='tel:123456789' data-rel='external'>
                                <Button variant='solid' colorScheme='teal' transition='.2s ease-in-out' _hover={{ mt: '-1.5' }}>
                                    <Icon as={AiOutlinePhone} mr={2}/>Call
                                </Button>
                            </Link>
                            <Link href='mailto:samuil@dare2fit.bg' data-rel='external'>
                                <Button variant='ghost' colorScheme='pink' transition='.2s ease-in-out' _hover={{ mt: '-1.5' }}>
                                    <Icon as={AiOutlineMail} mr={2}/>Email
                                </Button>
                            </Link>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
            </HStack>
        </VStack>
    );
};

export default Team;
