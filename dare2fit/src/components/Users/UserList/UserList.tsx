import { FC, ReactElement } from 'react';
import { Box, HStack, Heading, Spinner, Text, useColorModeValue, Icon } from '@chakra-ui/react';
import UserTable from '../UserTable/UserTable';
import { IUserData } from '../../../common/types';
import { FaUserSlash } from 'react-icons/fa';

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
                    <HStack w='100%' justify='center' p={4}>
                        <Icon as={FaUserSlash} fontSize='1.5em' />
                        <Text>No users here yet!</Text>
                    </HStack>}
        </Box>
    );
};

export default UserList;
