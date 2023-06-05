import { IconButton } from '@chakra-ui/button';
import { Badge, Box } from '@chakra-ui/layout';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { FC, ReactElement, useContext } from 'react';
import { FiBell, FiBellOff, FiUser, FiUsers } from 'react-icons/fi';
import { AppContext } from '../../../../context/AppContext/AppContext';
import SingleNotification from '../SingleNotification/SingleNotification';
import { IconType } from 'react-icons/lib';
import { useNavigate } from 'react-router';
import { MdBlock, MdOutlineAnnouncement } from 'react-icons/md';

const NotificationsList: FC = (): ReactElement => {
    const { userData } = useContext(AppContext);

    const navigate = useNavigate();

    const notifications = userData!.notifications ? Object.entries(userData!.notifications) : null;

    return (
        <Menu>
            <Box position='relative'>
                <MenuButton
                    as={IconButton}
                    transition='all 0.3s'
                    _focus={{ boxShadow: 'none' }}
                    size='lg'
                    variant='ghost'
                    aria-label='open menu'
                    icon={<FiBell />} />
                {notifications && <Badge colorScheme='pink' position='absolute' bottom={0} right={0}>{notifications.length}</Badge>}
            </Box>
            <MenuList w={{ base: '300px', lg: '450px' }} maxH='500px' overflowY='auto'>
                {notifications ?
                    notifications.map(([timestamp, notification]) => {
                        let icon: IconType;
                        let linkTo: string | null;
                        if (notification.includes('friend request') || notification.includes('unfriended you')) {
                            icon = FiUser;
                            linkTo = `profile/${notification.split(' ')[0]}`;
                        } else if (notification.includes('competing with you')) {
                            icon = FiUsers;
                            linkTo = `profile/${notification.split(' ')[0]}`;
                        } else if (notification === 'You are now an admin!') {
                            icon = MdOutlineAnnouncement;
                            linkTo = `profile/${userData!.handle}`;
                        } else if (notification === 'You have been blocked.') {
                            icon = MdBlock;
                            linkTo = `profile/${userData!.handle}`;
                        } else {
                            icon = FiBell;
                            linkTo = null;
                        }

                        return (<MenuItem key={timestamp} onClick={() => linkTo ? navigate(linkTo) : null}>
                            <SingleNotification notification={notification} timestamp={timestamp} icon={icon} />
                        </MenuItem>);
                    }) :
                    (<MenuItem>
                        <SingleNotification notification={'Nothing new here...'} icon={FiBellOff} />
                    </MenuItem>)}
            </MenuList>
        </Menu>
    );
};

export default NotificationsList;