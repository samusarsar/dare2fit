import { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { getUserByHandle, getUserFriendRequests } from '../../../services/user.services';
import { AppContext } from '../../../context/AppContext/AppContext';
import { IUserData } from '../../../common/types';
import { FriendRequestType } from '../../../common/enums';
import UserList from '../UserList/UserList';

const FriendRequestsList: FC<{ type: FriendRequestType }> = ({ type }): ReactElement => {
    const { userData } = useContext(AppContext);

    const [users, setUsers] = useState<IUserData[] | null>(null);

    const badgeColor = type === FriendRequestType.sent ? 'brand.yellow' : 'brand.purple';
    const heading = type === FriendRequestType.sent ? 'Sent:' : 'Received:';

    useEffect(() => {
        getUserFriendRequests(userData!.handle, type)
            .then(data => {
                const promises = Object.keys(data).map(handle => getUserByHandle(handle));
                Promise.all(promises)
                    .then(resultArr => setUsers(resultArr));
            })
            .catch(() => setUsers([]));
    }, []);

    return (
        <UserList users={users} badgeColor={badgeColor} heading={heading} />
    );
};

export default FriendRequestsList;
