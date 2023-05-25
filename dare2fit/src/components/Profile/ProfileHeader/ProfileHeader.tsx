/* eslint-disable max-len */
import { Box, Text, HStack, Avatar, VStack, Heading, useColorModeValue } from '@chakra-ui/react';
import { FC, ReactElement, useContext } from 'react';
import { AppContext } from '../../../context/AppContext/AppContext';
import { useLocation } from 'react-router-dom';
import { IUserData } from '../../../common/types';
import ShareButtons from '../../Base/ShareButtons/ShareButtons';

const ProfileHeader: FC<{ profile: IUserData }> = ({ profile }): ReactElement => {
    const { userData } = useContext(AppContext);

    const location = useLocation();

    const contrastColor = useColorModeValue('brand.dark', 'brand.light');

    const isMe = profile.handle === userData!.handle;

    // TODO:
    const handleAvatarChange = () => {
        console.log('changeAvatar');
    };

    return (
        <VStack w='100%' gap={1}>
            <Box p={1} bg={contrastColor} rounded='2xl'>
                <Avatar src={profile.avatarURL} name={`${profile.firstName} ${profile.lastName}`} rounded='xl' boxSize='120px'
                    onClick={isMe ? handleAvatarChange : () => null}/>
            </Box>
            <Heading as='h2' size='md'>{`${profile.firstName} ${profile.lastName}`}</Heading>
            <Text>@{profile.handle}</Text>
            <HStack gap={2}>
                <ShareButtons location={location.pathname} text={profile.handle} />
            </HStack>
        </VStack>
    );
};

export default ProfileHeader;
