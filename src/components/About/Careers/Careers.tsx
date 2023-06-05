/* eslint-disable max-len */
import { Card, CardBody, Image, Stack, Heading, Text, Button, VStack, Icon, CardHeader, InputGroup, InputLeftElement, Input, useDisclosure, Alert, AlertIcon, Box, AlertTitle, AlertDescription, CloseButton, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { FC, ReactElement, useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';

const Careers: FC = (): ReactElement => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });

    const handleSend = () => {
        setEmailError(!email.includes('@'));
        if (email.includes('@')) {
            onOpen();
            setEmail('');
        }
    };

    return (
        <VStack gap={4}>
            <Heading as='h2'>Career Opportunities at dare2fit</Heading>
            <Text>Don&apos;t wait another moment to begin building towards your professional goals and start at a bubbling work environment - right here at <b>dare2fit HQ</b>!</Text>
            <VStack justify='center' gap={10} py={4}>
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    align='center'
                    variant='elevated'
                    boxShadow='xl'
                    h={{ base: 'fit-content', md: 'fit-content' }}
                    w='fit-content'
                    transition='0.2s ease-in-out'
                    _hover={{ transform: 'scale(1.05)' }}
                >
                    <Image
                        objectFit='cover'
                        w={{ base: '100%', sm: '200px', md: '300px' }}
                        src='https://images.unsplash.com/photo-1559136656-3db4bf6c35f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80'
                        alt='Caffe Latte'
                    />
                    <VStack gap={2} py={2}>
                        <CardHeader pb={0}>
                            <Heading size='md'>Creative and Innovative Environment</Heading>
                        </CardHeader>
                        <CardBody py={0}>

                            <Text>
                                Joining the dare2fit team means you will be working
                                shoulder to shoulder with creative and innovative minds, re-shaping the industry!
                            </Text>
                        </CardBody>
                    </VStack>
                </Card>

                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    align='center'
                    variant='elevated'
                    boxShadow='xl'
                    h={{ base: 'fit-content', md: 'fit-content' }}
                    w='fit-content'
                    transition='0.2s ease-in-out'
                    _hover={{ transform: 'scale(1.05)' }}
                >
                    <Stack>
                        <CardHeader pb={0}>
                            <Heading size='md'>Dynamic Workplace</Heading>
                        </CardHeader>
                        <CardBody>
                            <Text py='2'>
                                dare2fit&apos;s HQ is in Sofia, Bulgaria and in features a state-of-the-art
                                open-office environment. Come by for a coffee to check it out!
                            </Text>
                        </CardBody>
                    </Stack>
                    <Image
                        objectFit='cover'
                        w={{ base: '100%', sm: '200px', md: '300px' }}
                        src='https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'
                        alt='Caffe Latte'
                    />
                </Card>

                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    align='center'
                    variant='elevated'
                    boxShadow='xl'
                    h={{ base: 'fit-content', md: 'fit-content' }}
                    w='fit-content'
                    transition='0.2s ease-in-out'
                    _hover={{ transform: 'scale(1.05)' }}
                >
                    <Image
                        objectFit='cover'
                        w={{ base: '100%', sm: '200px', md: '300px' }}
                        src='https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                        alt='Caffe Latte'
                    />
                    <Stack>
                        <CardHeader pb={0}>
                            <Heading size='md'>Professional Growth</Heading>
                        </CardHeader>
                        <CardBody>

                            <Text py='2'>
                                At dare2fit we don&apos;t shy away from challenges! Working here you will have to
                                think creatively and out-of-the-box, sharpening your skillset at all times!
                            </Text>
                        </CardBody>
                    </Stack>
                </Card>
            </VStack>

            <VStack w={{ base: '100%', md: '80%' }}>
                <Heading as='h3' size='lg'>Ready to jump in?</Heading>
                <Text>We&apos;re always hiring! Leave your email below and we&apos;ll get back to you ASAP!</Text>
                <InputGroup py={4}>
                    <InputLeftElement
                        pointerEvents='none'
                        mt={4}
                    > <Icon as={AiOutlineMail} boxSize='20px' color='brand.dark' /></InputLeftElement>
                    <FormControl isInvalid={emailError}>
                        <Input pl={12} type='email' placeholder='Email' bg='brand.white' color='brand.dark' focusBorderColor='brand.blue'
                            value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <FormErrorMessage>Email address is not valid.</FormErrorMessage>
                    </FormControl>
                </InputGroup>
                {isOpen ? (
                    <Alert status='success'>
                        <AlertIcon />
                        <Box>
                            <AlertTitle>Thank you for reaching out!</AlertTitle>
                            <AlertDescription>
                                Your email address has been received. A representative of the dare2fit
                                team will get in touch with you ASAP!
                            </AlertDescription>
                        </Box>
                        <CloseButton
                            alignSelf='flex-start'
                            position='relative'
                            right={-1}
                            top={-1}
                            onClick={onClose}
                        />
                    </Alert>
                ) : (
                    <Button onClick={handleSend} colorScheme='purple'>Send Details</Button>
                )}
            </VStack>
        </VStack>
    );
};

export default Careers;
