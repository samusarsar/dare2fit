import { FC, ReactElement } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import SearchUsers from '../../Users/SearchUsers/SearchUsers';
import AdminPanelUsersByRole from '../../Users/AdminPanelUsersByRole/AdminPanelUsersByRole';
import { Roles } from '../../../common/enums';

const ProfileAdminPanel: FC = (): ReactElement => {
    return (
        <Box>
            <SearchUsers />
            <VStack py={4} gap={3}>
                <AdminPanelUsersByRole role={Roles.WantAdmin} />
                <AdminPanelUsersByRole role={Roles.Blocked} />
            </VStack>
        </Box>
    );
};

export default ProfileAdminPanel;
