import { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { getUserByHandle, getUserFriends } from '../../../services/user.services';
import { AppContext } from '../../../context/AppContext/AppContext';
import { IUserData } from '../../../common/types';
import UserList from '../UserList/UserList';

const FriendsList: FC = (): ReactElement => {
    const { userData } = useContext(AppContext);

    const [friends, setFriends] = useState<IUserData[] | null>(null);

    useEffect(() => {
        getUserFriends(userData!.handle)
            .then(data => {
                const promises = Object.keys(data).map(handle => getUserByHandle(handle));
                Promise.all(promises)
                    .then(resultArr => setFriends(resultArr));
            })
            .catch(() => setFriends([]));
    }, []);

    return (
        <UserList users={friends} badgeColor={'brand.green'} heading={'Friends:'} />
    );
};

export default FriendsList;
