import { FC, ReactElement, useContext } from 'react';
import { IUserData } from '../../../common/types';
import { Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react';
import ProfileDetails from '../ProfileDetails/ProfileDetails';
import ProfileHealth from '../ProfileHealth/ProfileHealth';
import { AppContext } from '../../../context/AppContext/AppContext';
import ProfileAdminPanel from '../ProfileAdminPanel/ProfileAdminPanel';
import ProfileGoals from '../ProfileGoals/ProfileGoals';
import ProfileWorkouts from '../ProfileWorkouts/ProfileWorkouts';
import { UserRoles } from '../../../common/enums';

const ProfileTabs: FC<{ profile: IUserData }> = ({ profile }): ReactElement => {
    const { userData } = useContext(AppContext);

    const isMe = profile.handle === userData!.handle;
    const amAdmin = userData!.role === UserRoles.Admin;
    const isFriend = userData!.friends ? Object.keys(userData!.friends).includes(profile.handle) : false;

    return (
        <Tabs px={{ base: 0, md: 12 }} mt={2} align='start' isLazy={true}>
            <TabList>
                {isMe && <Tab>Health</Tab>}
                <Tab>Details</Tab>
                {(isMe && amAdmin) && <Tab>Admin Panel</Tab>}
                {!isMe && <Tab>Goals</Tab>}
                {!isMe && <Tab>Workouts</Tab>}
            </TabList>
            <TabPanels>
                {isMe &&
                <TabPanel>
                    <ProfileHealth />
                </TabPanel>}
                <TabPanel>
                    <ProfileDetails profile={profile} />
                </TabPanel>
                {isMe &&
                <TabPanel>
                    <ProfileAdminPanel />
                </TabPanel>}
                {!isMe &&
                <TabPanel>
                    {(isFriend || amAdmin) ?
                        <ProfileGoals profile={profile} /> :
                        <VStack h='200px' justify='center'>
                            <Text>You have to be friends with <b>@{profile.handle}</b> to view his Goals.</Text>
                        </VStack>}
                </TabPanel>}
                {!isMe &&
                <TabPanel>
                    {(isFriend || amAdmin) ?
                        <ProfileWorkouts profile={profile} /> :
                        <VStack h='200px' justify='center'>
                            <Text>You have to be friends with <b>@{profile.handle}</b> to view his Workouts.</Text>
                        </VStack>}
                </TabPanel>}
            </TabPanels>
        </Tabs>
    );
};

export default ProfileTabs;
