import { FC, ReactElement, useContext } from 'react';
import { IUserData } from '../../../common/types';
import { Editable, EditableInput, EditablePreview, HStack, Input, Table, Tbody, Td, Tr } from '@chakra-ui/react';
import EditableControls from '../../Base/EditableControls/EditableControls';
import { editUserDetails } from '../../../services/user.services';
import { AppContext } from '../../../context/AppContext/AppContext';

const ProfileDetails: FC<{ profile: IUserData }> = ({ profile }): ReactElement => {
    const { userData } = useContext(AppContext);

    const isMe = profile.handle === userData?.handle;

    const handleEdit = (value: string, prop: string) => {
        editUserDetails({ handle: profile.handle, propKey: prop, propValue: value });
    };

    return (
        <HStack w='100%' justify='center'>
            <Table variant='striped' colorScheme='blackAlpha' layout='fixed'>
                <Tbody>
                    <Tr>
                        <Td fontWeight='bold'>Username:</Td>
                        <Td>{profile.handle}</Td>
                    </Tr>
                    <Tr>
                        <Td fontWeight='bold'>First Name:</Td>
                        <Td>
                            <Editable textAlign='center' defaultValue={profile.firstName} isPreviewFocusable={false} display='flex' gap={2} w='fit-content'
                                onSubmit={(value) => handleEdit(value, 'firstName')}
                            >
                                <EditablePreview />
                                <Input as={EditableInput} />
                                {isMe && <EditableControls />}
                            </Editable>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td fontWeight='bold'>Last Name:</Td>
                        <Td>
                            <Editable textAlign='center' defaultValue={profile.lastName} isPreviewFocusable={false} display='flex' gap={2} w='fit-content'
                                onSubmit={(value) => handleEdit(value, 'firstName')}
                            >
                                <EditablePreview />
                                <Input as={EditableInput} />
                                {isMe && <EditableControls />}
                            </Editable>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td fontWeight='bold'>Date of Birth:</Td>
                        <Td>
                            <Editable textAlign='center' defaultValue={profile.dateOfBirth || '-'} isPreviewFocusable={false} display='flex' gap={2} w='fit-content'
                                onSubmit={(value) => handleEdit(value, 'dateOfBirth')}
                            >
                                <EditablePreview />
                                <Input as={EditableInput} />
                                {isMe && <EditableControls />}
                            </Editable>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td fontWeight='bold'>Member Since:</Td>
                        <Td>{profile.createdOn.split(' ')[0]}</Td>
                    </Tr>
                    <Tr>
                        <Td fontWeight='bold'>Email:</Td>
                        <Td>{profile.email}</Td>
                    </Tr>
                    <Tr>
                        <Td fontWeight='bold'>Telephone:</Td>
                        <Td>
                            <Editable textAlign='center' defaultValue={profile.telephone || '-'} isPreviewFocusable={false} display='flex' gap={2} w='fit-content'
                                onSubmit={(value) => handleEdit(value, 'telephone')}
                            >
                                <EditablePreview />
                                <Input as={EditableInput} />
                                {isMe && <EditableControls />}
                            </Editable>
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </HStack>
    );
};

export default ProfileDetails;
