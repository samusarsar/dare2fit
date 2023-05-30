/* eslint-disable max-len */
import { ChangeEvent, FC, ReactElement, useContext, useRef, useState } from 'react';
import { Box, Text, HStack, Avatar, VStack, Heading, useColorModeValue, Input, Button, Badge } from '@chakra-ui/react';
import { AppContext } from '../../../context/AppContext/AppContext';
import { useLocation } from 'react-router-dom';
import { IUserData } from '../../../common/types';
import ShareButtons from '../../Base/ShareButtons/ShareButtons';
import { changeAvatar, makeFriends, resolveRequestByRecipient, resolveRequestBySender, sendFriendRequest, unFriend } from '../../../services/user.services';
import { AiOutlineUserAdd, AiOutlineUserDelete } from 'react-icons/ai';

const ProfileHeader: FC<{ profile: IUserData }> = ({ profile }): ReactElement => {
    const { userData } = useContext(AppContext);

    const [loadingBtn, setLoadingBtn] = useState(false);

    const location = useLocation();

    const contrastColor = useColorModeValue('brand.dark', 'brand.light');

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const isMe = profile.handle === userData!.handle;
    const isFriend = userData!.friends ? Object.keys(userData!.friends).includes(profile.handle) : false;
    const hasReceivedRequest = userData!.receivedFriendRequests ? Object.keys(userData!.receivedFriendRequests).includes(profile.handle) : false;
    const hasSentRequest = userData!.sentFriendRequests ? Object.keys(userData!.sentFriendRequests).includes(profile.handle) : false;

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

    const handleAddFriend = () => {
        setLoadingBtn(true);
        sendFriendRequest(userData!.handle, profile.handle)
            .then(() => setLoadingBtn(false));
    };

    const handleWithdrawFriendRequest = () => {
        setLoadingBtn(true);
        resolveRequestBySender(userData!.handle, profile.handle)
            .then(() => setLoadingBtn(false));
    };

    const handleAcceptFriendRequest = () => {
        setLoadingBtn(true);
        resolveRequestByRecipient(userData!.handle, profile.handle)
            .then(() => makeFriends(userData!.handle, profile.handle))
            .then(() => setLoadingBtn(false));
    };

    const handleRejectFriendRequest = () => {
        setLoadingBtn(true);
        resolveRequestByRecipient(userData!.handle, profile.handle)
            .then(() => setLoadingBtn(false));
    };

    const handleRemoveFriend = () => {
        setLoadingBtn(true);
        unFriend(userData!.handle, profile.handle)
            .then(() => setLoadingBtn(false));
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
            <HStack>
                <Text>@{profile.handle}</Text>
                {isFriend && <Badge colorScheme='teal' size='md'>Friend</Badge>}
            </HStack>
            {!isMe &&
            <HStack>
                {!isFriend ?
                    (hasReceivedRequest ?
                        <>
                            <Button colorScheme='teal' leftIcon={<AiOutlineUserAdd />} size='sm' isLoading={loadingBtn} onClick={handleAcceptFriendRequest}>Accept Friend</Button>
                            <Button colorScheme='pink' variant='outline' leftIcon={<AiOutlineUserDelete />} size='sm' isLoading={loadingBtn} onClick={handleRejectFriendRequest}>Reject Friend</Button>
                        </> :
                        (!hasSentRequest ?
                            <Button colorScheme='teal' leftIcon={<AiOutlineUserAdd />} size='sm' isLoading={loadingBtn} onClick={handleAddFriend}>Add Friend</Button> :
                            <Button colorScheme='teal' variant='outline' leftIcon={<AiOutlineUserAdd />} isLoading={loadingBtn} size='sm' onClick={handleWithdrawFriendRequest}>Request Sent</Button>)) :
                    (<Button colorScheme='pink' variant='outline' leftIcon={<AiOutlineUserDelete />} size='sm' isLoading={loadingBtn} onClick={handleRemoveFriend}>Remove Friend</Button>)}
            </HStack>}
            <HStack gap={2}>
                <ShareButtons location={location.pathname} text={profile.handle} />
            </HStack>
        </VStack>
    );
};

export default ProfileHeader;
