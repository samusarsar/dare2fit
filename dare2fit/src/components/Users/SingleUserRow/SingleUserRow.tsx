import { FC, ReactElement, useContext, useEffect, useState } from 'react';

import {
    Avatar,
    Badge,
    Button,
    Flex,
    Spinner,
    Td,
    Text,
    Tr,
    VStack,
    useColorModeValue,
} from '@chakra-ui/react';
import { IUserData } from '../../../common/types';
import { AppContext } from '../../../context/AppContext/AppContext';
import { makeFriends, resolveRequestByRecipient, resolveRequestBySender, sendFriendRequest, unFriend } from '../../../services/user.services';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../config/firebase-config';

const SingleUserRow: FC<{ user: IUserData }> = ({ user }): ReactElement => {
    const { userData } = useContext(AppContext);

    const [isFriend, setIsFriend] = useState(false);
    const [requestSent, setRequestSent] = useState(false);
    const [requestReceived, setRequestReceived] = useState(false);
    const [loadingFriendInfo, setLoadingFriendInfo] = useState(true);
    const [loadingBtn, setLoadingBtn] = useState(false);

    const textColor = useColorModeValue('gray.700', 'white');

    const handleAddFriend = () => {
        setLoadingBtn(true);
        sendFriendRequest(userData!.handle, user.handle)
            .then(() => setLoadingBtn(false));
    };

    const handleAcceptFriendRequest = () => {
        setLoadingBtn(true);
        resolveRequestByRecipient(userData!.handle, user.handle)
            .then(() => makeFriends(userData!.handle, user.handle))
            .then(() => setLoadingBtn(false));
    };

    const handleRejectFriendRequest = () => {
        setLoadingBtn(true);
        resolveRequestByRecipient(userData!.handle, user.handle)
            .then(() => setLoadingBtn(false));
    };

    const handleWithdrawFriendRequest = () => {
        setLoadingBtn(true);
        resolveRequestBySender(userData!.handle, user.handle)
            .then(() => setLoadingBtn(false));
    };

    const handleRemoveFriend = () => {
        setLoadingBtn(true);
        unFriend(userData!.handle, user.handle)
            .then(() => setLoadingBtn(false));
    };

    useEffect(() => {
        return onValue(ref(db, `users/${userData!.handle}`), (snapshot) => {
            setLoadingFriendInfo(true);
            const data = snapshot.val();
            setIsFriend(data.friends ? Object.keys(data.friends).includes(user.handle) : false);
            setRequestSent(data.sentFriendRequests ? Object.keys(data.sentFriendRequests).includes(user.handle) : false);
            setRequestReceived(data.receivedFriendRequests ? Object.keys(data.receivedFriendRequests).includes(user.handle) : false);
            setLoadingFriendInfo(false);
        });
    }, []);

    return (
        <Tr>
            <Td>
                <Flex align="center" minWidth='100%' flexWrap="nowrap">
                    <Avatar name={user.handle} w="80px" h='80px' borderRadius="12px" me="18px" p={2} />
                    <Flex direction="column" gap={1}>
                        <Text
                            fontSize="md"
                            color={textColor}
                            fontWeight="bold"
                            minWidth="100%"
                        >
                            {user.firstName} {user.lastName}
                        </Text>
                        <Text fontSize="md" color='gray.400' fontWeight="bold">
                            @{user.handle}
                        </Text>
                        <Text fontSize="sm" color="gray.400" fontWeight="normal">
                            Email: {user.email}
                        </Text>
                    </Flex>
                </Flex>
            </Td>

            <Td>
                <Badge
                    fontSize="14px"
                    p="3px 10px"
                    borderRadius="8px"
                >
                    {user.role}
                </Badge>
            </Td>
            <Td>
                {!loadingFriendInfo ?
                    (<VStack align='start'>
                        {isFriend ?
                            (<Button variant='ghost' colorScheme='red' isLoading={loadingBtn} onClick={handleRemoveFriend}>
                                Remove Friend
                            </Button>) :
                            requestSent ?
                                (<Button variant='outline' colorScheme='telegram' isLoading={loadingBtn} onClick={handleWithdrawFriendRequest}>
                                    Pending
                                </Button>) :
                                requestReceived ?
                                    (<>
                                        <Button variant='ghost' colorScheme='whatsapp' isLoading={loadingBtn} onClick={handleAcceptFriendRequest}>
                                            Accept
                                        </Button>
                                        <Button variant='ghost' colorScheme='red' isLoading={loadingBtn} onClick={handleRejectFriendRequest}>
                                            Reject
                                        </Button>
                                    </>) :
                                    (<Button variant='solid' colorScheme='whatsapp' isLoading={loadingBtn} onClick={handleAddFriend}>
                                        Add Friend
                                    </Button>)}
                    </VStack>) :
                    <Spinner />}
            </Td>
        </Tr>
    );
};

export default SingleUserRow;
