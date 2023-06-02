import { FC, ReactElement, useContext, useState } from 'react';
import { IUserData } from '../../../common/types';
import { Editable, EditableInput, EditablePreview, FormControl, FormErrorMessage, HStack, Input, Table, Tbody, Td, Text, Tr, VStack } from '@chakra-ui/react';
import EditableControls from '../../Base/EditableControls/EditableControls';
import { editUserDetails } from '../../../services/user.services';
import { AppContext } from '../../../context/AppContext/AppContext';
import { DATE_FORMAT, FIRST_NAME_MAX_LENGTH, FIRST_NAME_MIN_LENGTH, LAST_NAME_MAX_LENGTH, LAST_NAME_MIN_LENGTH } from '../../../common/constants';
import moment from 'moment';

const ProfileDetails: FC<{ profile: IUserData }> = ({ profile }): ReactElement => {
    const { userData } = useContext(AppContext);

    const [errors, setErrors] = useState({
        firstNameError: false,
        lastNameError: false,
        dateOfBirthError: false,
        telephoneError: false,
    });

    const isMe = profile.handle === userData?.handle;

    const handleEdit = (value: string, prop: string) => {
        editUserDetails({ handle: profile.handle, propKey: prop, propValue: value });
    };

    return (
        <HStack w='100%' justify='center'>
            <Table variant='striped' colorScheme='blackAlpha' layout={{ base: 'inherit', md: 'fixed' }}>
                <Tbody>
                    <Tr>
                        <Td fontWeight='bold'>Username:</Td>
                        <Td>{profile.handle}</Td>
                    </Tr>
                    <Tr>
                        <Td fontWeight='bold'>First Name:</Td>
                        <Td>
                            <Editable textAlign='center' defaultValue={profile.firstName} isPreviewFocusable={false} display='flex' gap={2} w='fit-content'
                                onSubmit={(value) => {
                                    if (value.length < FIRST_NAME_MIN_LENGTH || value.length > FIRST_NAME_MAX_LENGTH) {
                                        setErrors({
                                            ...errors,
                                            firstNameError: true,
                                        });
                                    } else {
                                        setErrors({
                                            ...errors,
                                            firstNameError: false,
                                        });
                                        handleEdit(value, 'firstName');
                                    }
                                }}>
                                <FormControl isInvalid={errors.firstNameError}>
                                    <VStack align='start'>
                                        <HStack>
                                            <EditablePreview />
                                            <Input as={EditableInput} />
                                            {isMe && <EditableControls />}
                                        </HStack>
                                        <FormErrorMessage textAlign='start'>First name must be between 3 and 32 characters.</FormErrorMessage>
                                    </VStack>
                                </FormControl>
                            </Editable>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td fontWeight='bold'>Last Name:</Td>
                        <Td>
                            <Editable textAlign='center' defaultValue={profile.lastName} isPreviewFocusable={false} display='flex' gap={2} w='fit-content'
                                onSubmit={(value) => {
                                    if (value.length < LAST_NAME_MIN_LENGTH || value.length > LAST_NAME_MAX_LENGTH) {
                                        setErrors({
                                            ...errors,
                                            lastNameError: true,
                                        });
                                    } else {
                                        setErrors({
                                            ...errors,
                                            lastNameError: false,
                                        });
                                        handleEdit(value, 'lastName');
                                    }
                                }}>
                                <FormControl isInvalid={errors.lastNameError}>
                                    <VStack align='start'>
                                        <HStack>
                                            <EditablePreview />
                                            <Input as={EditableInput} />
                                            {isMe && <EditableControls />}
                                        </HStack>
                                        <FormErrorMessage textAlign='start'>Last name must be between 3 and 32 characters.</FormErrorMessage>
                                    </VStack>
                                </FormControl>
                            </Editable>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>
                            <Text fontWeight='bold'>Date of Birth</Text>
                            <span>{DATE_FORMAT}</span>
                        </Td>
                        <Td>
                            <Editable textAlign='center' defaultValue={profile.dateOfBirth || '-'} isPreviewFocusable={false} display='flex' gap={2} w='fit-content'
                                onSubmit={(value) => {
                                    if ((!moment(value, DATE_FORMAT).isValid()) || (moment(value, DATE_FORMAT).diff(moment()) > 0)) {
                                        setErrors({
                                            ...errors,
                                            dateOfBirthError: true,
                                        });
                                    } else {
                                        setErrors({
                                            ...errors,
                                            dateOfBirthError: false,
                                        });
                                        handleEdit(moment(value).format(DATE_FORMAT), 'dateOfBirth');
                                    }
                                }}>
                                <FormControl isInvalid={errors.dateOfBirthError}>
                                    <VStack align='start'>
                                        <HStack>
                                            <EditablePreview />
                                            <Input as={EditableInput} />
                                            {isMe && <EditableControls />}
                                        </HStack>
                                        <FormErrorMessage textAlign='start'>Date of birth must be valid and in &apos;{DATE_FORMAT}&apos; format.</FormErrorMessage>
                                    </VStack>
                                </FormControl>
                            </Editable>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td fontWeight='bold'>Email:</Td>
                        <Td>{profile.email}</Td>
                    </Tr>
                    <Tr>
                        <Td fontWeight='bold'>Telephone:</Td>
                        <Td>{profile.telephone}</Td>
                    </Tr>
                    <Tr>
                        <Td fontWeight='bold'>Member Since:</Td>
                        <Td>{profile.createdOn.split(' ')[0]}</Td>
                    </Tr>
                </Tbody>
            </Table>
        </HStack>
    );
};

export default ProfileDetails;
