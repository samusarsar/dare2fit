import { FC, ReactElement } from 'react';
import { IUserData } from '../../../common/types';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import ProfileDetails from '../ProfileDetails/ProfileDetails';

const ProfileTabs: FC<{ profile: IUserData }> = ({ profile }): ReactElement => {
    return (
        <Tabs px={{ base: 0, md: 12 }} mt={2} isLazy={true}>
            <TabList>
                <Tab>Details</Tab>
                <Tab>Liked</Tab>
            </TabList>
            <TabPanels bg='brand.600'>
                <TabPanel>
                    <ProfileDetails profile={profile} />
                </TabPanel>
                <TabPanel>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default ProfileTabs;
