import { FC, useEffect, useState } from 'react';
import { IUserData } from '../../common/types';
import { useParams } from 'react-router';
import { onValue, ref } from 'firebase/database';
import { db } from '../../config/firebase-config';
import { Box, Container, Spinner, VStack } from '@chakra-ui/react';
import ProfileHeader from '../../components/Profile/ProfileHeader/ProfileHeader';
import ProfileTabs from '../../components/Profile/ProfileTabs/ProfileTabs';

const ProfileView: FC = () => {
    const { handle } = useParams();

    const [profile, setProfile] = useState<IUserData | null>(null);
    const [trigger, setTrigger] = useState<boolean>(false);

    useEffect(() => {
        setProfile(null);
        setTrigger(!trigger);
    }, [handle]);

    useEffect(() => {
        setProfile(null);
        return onValue(ref(db, `users/${handle}`), (snapshot) => {
            const data = snapshot.val();
            setProfile(data);
        });
    }, [trigger]);

    if (profile) {
        return (
            <Box>
                <ProfileHeader profile={profile} />
                <ProfileTabs profile={profile} />
            </Box>
        );
    }

    return (
        <Container maxW='container' minH='80vh'>
            <Container maxW='container' bg='brand.100' h='200px' />
            <VStack justify='center' pt={6}>
                <Spinner size='xl' />
            </VStack>
        </Container>
    );
};

export default ProfileView;
