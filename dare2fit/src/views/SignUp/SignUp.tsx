// eslint-disable-next-line max-len
import { FIRST_NAME_MAX_LENGTH, FIRST_NAME_MIN_LENGTH, LAST_NAME_MAX_LENGTH, LAST_NAME_MIN_LENGTH, PASSWORD_MIN_LENGTH, RESTRICTED_CHARS, TELEPHONE_LENGTH, USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from '../../common/constants';
import { FormControl, FormLabel, Input, FormErrorMessage, Text, Button, HStack, Divider, VStack, useToast } from '@chakra-ui/react';
import { Formik, Field } from 'formik';
import { FC, ReactElement, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import AccountBase from '../../components/Base/AccountBase/AccountBase';
import { AppContext } from '../../context/AppContext/AppContext';
import { createUser, getUserByHandle, getUserByTelephone } from '../../services/user.services';
import { registerUser } from '../../services/auth.services';

const SignUp: FC = (): ReactElement => {
    const { setContext } = useContext(AppContext);

    const navigate = useNavigate();

    const [usernameExists, setUsernameExists] = useState(false);
    const [emailExists, setEmailExists] = useState(false);
    const [telephoneExists, setTelephoneExists] = useState(false);
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    return (
        <AccountBase>
            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    telephone: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                }}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={(values) => {
                    setLoading(true);
                    getUserByHandle(values.username)
                        .catch(() => {
                            setUsernameExists(false);

                            return getUserByTelephone(values.telephone)
                                .catch(() => {
                                    setTelephoneExists(false);

                                    return registerUser(values.email, values.password)
                                        .then(credential => {
                                            return createUser(values.username, credential.user.uid, values.email, values.telephone, values.firstName, values.lastName)
                                                .then(() =>
                                                    setContext({
                                                        user: credential.user,
                                                        userData: null,
                                                    }));
                                        })
                                        .then(() => {
                                            setEmailExists(false);
                                            navigate('/activity');
                                            toast({
                                                title: 'Welcome to dare2fit!',
                                                description: 'Get ready for your fitness journey!',
                                                status: 'success',
                                                duration: 3000,
                                                isClosable: true,
                                                position: 'top',
                                                variant: 'subtle',
                                            });
                                        });
                                })
                                .then((result) => {
                                    if (result) {
                                        throw new Error(`Telephone already in use!`);
                                    }
                                });
                        })
                        .then(result => {
                            if (result) {
                                throw new Error(`Username has already been taken!`);
                            }
                        })
                        .catch(e => {
                            switch (e.message) {
                            case 'Firebase: Error (auth/email-already-in-use).':
                                setEmailExists(true);
                                break;
                            case `Username has already been taken!`:
                                setUsernameExists(true);
                                break;
                            case `Telephone already in use!`:
                                setTelephoneExists(true);
                                break;
                            }
                        })
                        .finally(() => setLoading(false));
                }}
            >
                {({ handleSubmit, errors, touched }) => (
                    <form onSubmit={handleSubmit}>
                        <HStack h='350px' p={10}>
                            <VStack>
                                <FormControl isInvalid={(!!errors.username && touched.username) || usernameExists} isRequired={true} pr={4}>
                                    <FormLabel htmlFor='username'>Username</FormLabel>
                                    <Field as={Input} id='username' name='username' type='text' placeholder='johndoe'
                                        validate={(value: string) => {
                                            return (value.length < USERNAME_MIN_LENGTH || value.length > USERNAME_MAX_LENGTH) ?
                                                'Username must be between 2 and 20 characters.' :
                                                RESTRICTED_CHARS.some(c => value.includes(c)) ?
                                                    'Username can\'t contain special characters' :
                                                    null;
                                        }}/>
                                    <FormErrorMessage>{errors.username || `Username has already been taken.`}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.password && touched.password} isRequired={true} pr={4}>
                                    <FormLabel htmlFor='password'>Password</FormLabel>
                                    <Field as={Input} id='password' name='password' type='password'
                                        validate={(value: string) => {
                                            return value.length < PASSWORD_MIN_LENGTH ?
                                                'Password should be more than 6 characters.' :
                                                null;
                                        }}/>
                                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                                </FormControl>
                            </VStack>
                            <Divider orientation='vertical' />
                            <VStack pl={4}>
                                <FormControl isInvalid={!!errors.firstName && touched.firstName} isRequired={true}>
                                    <FormLabel>First Name</FormLabel>
                                    <Field as={Input} id='firstName' name='firstName' type='text' placeholder='John'
                                        validate={(value: string) => {
                                            return (value.length < FIRST_NAME_MIN_LENGTH || value.length > FIRST_NAME_MAX_LENGTH) ?
                                                'First name should be between 3 and 32 characters.' :
                                                null;
                                        }}/>
                                    <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.lastName && touched.lastName} isRequired={true}>
                                    <FormLabel>Last Name</FormLabel>
                                    <Field as={Input} id='lastName' name='lastName' type='text' placeholder='Doe'
                                        validate={(value: string) => {
                                            return (value.length < LAST_NAME_MIN_LENGTH || value.length > LAST_NAME_MAX_LENGTH) ?
                                                'Last name should be between 3 and 32 characters.' :
                                                null;
                                        }}/>
                                    <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={emailExists} isRequired={true} >
                                    <FormLabel>Email</FormLabel>
                                    <Field as={Input} id='email' name='email' type='email' placeholder='johndoe@dare2fit.bg'/>
                                    <FormErrorMessage>Email is already in use.</FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={!!errors.telephone || telephoneExists} isRequired={true} >
                                    <FormLabel>Telephone</FormLabel>
                                    <Field as={Input} id='telephone' name='telephone' type='telephone' placeholder='0881234567'
                                        validate={(value: string) => {
                                            return ((value.length !== TELEPHONE_LENGTH) || (value.split('').some(el => isNaN(+el)))) ?
                                                'Telephone must be valid and 10 digits long.' :
                                                null;
                                        }}/>
                                    <FormErrorMessage>{errors.telephone || 'Telephone is already in use.'}</FormErrorMessage>
                                </FormControl>
                            </VStack>
                        </HStack>
                        <VStack mb={8}>
                            <HStack>
                                <Button colorScheme='yellow' type='submit' isLoading={loading} >Sign Up</Button>
                                <Button>Cancel</Button>
                            </HStack>
                            <Text fontSize='sm'>Already have an account?
                                <Button colorScheme='pink' variant='link' ml={2} onClick={() => navigate('/login')}>Log In</Button>
                            </Text>
                        </VStack>
                    </form>
                )}
            </Formik>
        </AccountBase>
    );
};

export default SignUp;
