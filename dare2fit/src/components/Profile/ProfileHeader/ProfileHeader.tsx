/* eslint-disable max-len */
import { ChangeEvent, FC, ReactElement, useContext, useRef } from 'react';
import { Box, Text, HStack, Avatar, VStack, Heading, useColorModeValue, Input } from '@chakra-ui/react';
import { AppContext } from '../../../context/AppContext/AppContext';
import { useLocation } from 'react-router-dom';
import { IUserData } from '../../../common/types';
import ShareButtons from '../../Base/ShareButtons/ShareButtons';
import { changeAvatar } from '../../../services/user.services';

const ProfileHeader: FC<{ profile: IUserData }> = ({ profile }): ReactElement => {
    const { userData } = useContext(AppContext);

    const location = useLocation();

    const contrastColor = useColorModeValue('brand.dark', 'brand.light');

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const isMe = profile.handle === userData!.handle;

    const handleAvatarClick = () => {
        if (isMe && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files) {
            changeAvatar(userData!.handle, files[0]);
        }
    };

    return (
        <VStack w='100%' gap={1}>
            <Box p={1} bg={contrastColor} rounded='2xl'>
                <Avatar src={profile.avatarURL} name={`${profile.firstName} ${profile.lastName}`} borderRadius='xl' boxSize='120px' cursor={isMe ? 'pointer' : 'default'} loading='eager'
                    onClick={handleAvatarClick}/>
                <Input type='file' id='upload' ref={fileInputRef} accept='image/png, image/jpg, image/jpeg' display='none'
                    onChange={handleFileSelect}/>
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
