import { FC, useContext, useState } from 'react';
import { loginUser } from '../../services/auth.services';
import AccountBase from '../../components/Base/AccountBase/AccountBase';
import { Formik, Field } from 'formik';
import { VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, FormErrorMessage, Button, HStack, Text, useColorModeValue, useToast } from '@chakra-ui/react';
import { PASSWORD_MIN_LENGTH } from '../../common/constants';
import { AppContext } from '../../context/AppContext/AppContext';

const LogIn: FC = () => {
    const { setContext } = useContext(AppContext);

    const [show, setShow] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const toast = useToast();

    // const handleLogOut = () => {
    //     logoutUser();
    //     setContext({
    //         user: null,
    //         userData: null,
    //     });
    //     toast({
    //         title: 'See you soon!',
    //         description: 'You have successfully logged out.',
    //         status: 'info',
    //         duration: 3000,
    //         isClosable: true,
    //         position: 'top',
    //         variant: 'subtle',
    //     });
    // };

    return (
        <AccountBase>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={(values) => {
                    loginUser(values.email, values.password)
                        .then(credential =>
                            setContext({
                                user: credential.user,
                                userData: null,
                            }))
                        .then(() => {
                            // navigate(from, { replace: true });
                            toast({
                                title: 'Welcome back!',
                                description: 'Dare to continue your fitness journey?',
                                status: 'success',
                                duration: 3000,
                                isClosable: true,
                                position: 'top',
                                variant: 'subtle',
                            });
                            setEmailError(false);
                            setPasswordError(false);
                        })
                        .catch(e => {
                            switch (e.message) {
                            case 'Firebase: Error (auth/user-not-found).':
                                setEmailError(true);
                                setPasswordError(false);
                                break;
                            case 'Firebase: Error (auth/wrong-password).':
                                setPasswordError(true);
                                setEmailError(false);
                                break;
                            }
                        });
                }}
            >
                {({ handleSubmit, errors, touched }) => (
                    <form onSubmit={handleSubmit}>
                        <VStack p={10} color={useColorModeValue('brand.light', 'brand.dark')}>
                            <FormControl pr={4} isInvalid={emailError}>
                                <FormLabel htmlFor='email'>Email</FormLabel>
                                <Field
                                    as={Input}
                                    id='email'
                                    name='email'
                                    type='email'
                                    placeholder='Enter email' />
                                <FormErrorMessage>Email doesn&apos;t exist.</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={(!!errors.password && touched.password) || !!passwordError} isRequired={true} pr={4}>
                                <FormLabel htmlFor='password'>Password</FormLabel>
                                <InputGroup size='md'>
                                    <Field
                                        as={Input}
                                        id='password'
                                        name='password'
                                        type={show ? 'text' : 'password'}
                                        placeholder='Enter password'
                                        validate={(value: string) => {
                                            return value.length < PASSWORD_MIN_LENGTH ?
                                                'Password must contain at least 6 characters' :
                                                null;
                                        }}/>
                                    <InputRightElement width='4.5rem'>
                                        <Button colorScheme='blackAlpha' size='sm' onClick={() => setShow(!show)}>
                                            {show ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>{errors.password || 'Password is incorrect.'}</FormErrorMessage>
                            </FormControl>
                        </VStack>
                        <VStack mb={8}>
                            <HStack>
                                <Button type='submit' colorScheme='purple'>Log In</Button>
                                <Button colorScheme='whiteAlpha'>Cancel</Button>
                            </HStack>
                            <Text fontSize='sm'>Not yet a member? Join us now!
                                <Button colorScheme='yellow' variant='link' ml={2}>Sign Up</Button>
                            </Text>
                        </VStack>
                    </form>
                )}
            </Formik>
        </AccountBase>
    );
};

export default LogIn;
