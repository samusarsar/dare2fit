import { Box, Heading, Spinner, Text, useColorModeValue } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';
import UserTable from '../UserTable/UserTable';
import { IUserData } from '../../../common/types';

const UserList: FC<{ users: IUserData[] | null, badgeColor: string, heading: string }> = ({ users, badgeColor, heading }): ReactElement => {
    const backgroundColor = useColorModeValue('brand.white', 'brand.grey');

    return (
        <Box overflowX='auto' bg={backgroundColor} p={4} rounded='lg' boxShadow='lg' w='100%'>
            <Box bg={badgeColor} maxW='fit-content' py={2} px={3} mb={3} rounded='full'>
                <Heading as='h3' size='md' color='brand.dark'>{heading}</Heading>
            </Box>
            {!users ?
                <Spinner /> :
                users.length ?
                    <UserTable users={users} /> :
                    <Text>No users here yet!</Text>}
        </Box>
    );
};

export default UserList;
