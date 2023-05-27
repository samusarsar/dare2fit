import { FC, ReactElement, useContext } from 'react';
import { IUserData } from '../../../common/types';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import ProfileDetails from '../ProfileDetails/ProfileDetails';
import ProfileHealth from '../ProfileHealth/ProfileHealth';
import { AppContext } from '../../../context/AppContext/AppContext';
import ProfileAdminPanel from '../ProfileAdminPanel/ProfileAdminPanel';

const ProfileTabs: FC<{ profile: IUserData }> = ({ profile }): ReactElement => {
    const { userData } = useContext(AppContext);

    const isMe = profile.handle === userData!.handle;

    return (
        <Tabs px={{ base: 0, md: 12 }} mt={2} align='start' isLazy={true}>
            <TabList>
                {isMe && <Tab>Health</Tab>}
                <Tab>Details</Tab>
                {isMe && <Tab>Admin Panel</Tab>}
            </TabList>
            <TabPanels bg='brand.600'>
                {isMe &&
                <TabPanel>
                    <ProfileHealth profile={profile} />
                </TabPanel>}
                <TabPanel>
                    <ProfileDetails profile={profile} />
                </TabPanel>
                {isMe &&
                <TabPanel>
                    <ProfileAdminPanel />
                </TabPanel>}
            </TabPanels>
        </Tabs>
    );
};

export default ProfileTabs;
