import { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { getUserByHandle } from '../../../services/user.services';
import { AppContext } from '../../../context/AppContext/AppContext';
import { IUserData } from '../../../common/types';
import UserList from '../UserList/UserList';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../config/firebase-config';

const FriendsList: FC = (): ReactElement => {
    const { userData } = useContext(AppContext);

    const [friends, setFriends] = useState<IUserData[] | null>(null);

    useEffect(() => {
        return onValue(ref(db, `users/${userData!.handle}/friends`), (snapshot) => {
            if (!snapshot.exists()) {
                setFriends([]);
            } else {
                const promises = Object.keys(snapshot.val()).map(handle => getUserByHandle(handle));
                Promise.all(promises)
                    .then(resultArr => setFriends(resultArr));
            }
        });
    }, []);

    return (
        <UserList users={friends} badgeColor={'brand.green'} heading={'Friends:'} />
    );
};

export default FriendsList;
