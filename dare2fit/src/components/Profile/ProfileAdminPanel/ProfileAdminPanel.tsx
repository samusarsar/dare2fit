import { FC, ReactElement } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import SearchUsers from '../../Users/SearchUsers/SearchUsers';
import AdminPanelUsersByRole from '../../Users/AdminPanelUsersByRole/AdminPanelUsersByRole';
import { UserRoles } from '../../../common/enums';

const ProfileAdminPanel: FC = (): ReactElement => {
    return (
        <Box>
            <SearchUsers />
            <VStack py={4} gap={3}>
                <AdminPanelUsersByRole role={UserRoles.WantAdmin} />
                <AdminPanelUsersByRole role={UserRoles.Blocked} />
            </VStack>
        </Box>
    );
};

export default ProfileAdminPanel;
