import { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { getUserByHandle } from '../../../services/user.services';
import { AppContext } from '../../../context/AppContext/AppContext';
import { IUserData } from '../../../common/types';
import { FriendRequestType } from '../../../common/enums';
import UserList from '../UserList/UserList';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../config/firebase-config';

const FriendRequestsList: FC<{ type: FriendRequestType }> = ({ type }): ReactElement => {
    const { userData } = useContext(AppContext);

    const [users, setUsers] = useState<IUserData[] | null>(null);

    const badgeColor = type === FriendRequestType.sent ? 'brand.yellow' : 'brand.purple';
    const heading = type === FriendRequestType.sent ? 'Sent:' : 'Received:';

    useEffect(() => {
        return onValue(ref(db, `users/${userData!.handle}/${type}FriendRequests`), (snapshot) => {
            if (!snapshot.exists()) {
                setUsers([]);
            } else {
                const promises = Object.keys(snapshot.val()).map(handle => getUserByHandle(handle));
                Promise.all(promises)
                    .then(resultArr => setUsers(resultArr));
            }
        });
    }, []);

    return (
        <UserList users={users} badgeColor={badgeColor} heading={heading} />
    );
};

export default FriendRequestsList;
