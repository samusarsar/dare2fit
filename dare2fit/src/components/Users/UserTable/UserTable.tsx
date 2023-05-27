import { FC, ReactElement } from 'react';
import { Table, Tbody, Td, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import { IUserData } from '../../../common/types';
import SingleUserRow from '../SingleUserRow/SingleUserRow';
import { useParams } from 'react-router';

const UserTable: FC<{ users: IUserData[] | [] }> = ({ users }): ReactElement => {
    const textColor = useColorModeValue('gray.700', 'white');

    const { handle } = useParams();

    return (
        <Table variant='simple' color={textColor}>
            <Thead>
                <Tr my='.8rem' pl='0px' color='gray.400'>
                    <Td>User</Td>
                    <Td>Role</Td>
                    {!handle && <Td>Actions</Td>}
                    {handle && <Td colSpan={2} textAlign='center'>Admin Actions</Td>}
                </Tr>
            </Thead>
            <Tbody>
                {users.map(user =>
                    <SingleUserRow
                        key={user.uid}
                        user={user}
                    />)}
            </Tbody>
        </Table>
    );
};

export default UserTable;
