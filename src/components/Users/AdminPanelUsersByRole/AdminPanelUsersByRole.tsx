import { FC, ReactElement, useEffect, useState } from 'react';
import { IUserData } from '../../../common/types';
import UserList from '../UserList/UserList';
import { equalTo, onValue, orderByChild, query, ref } from 'firebase/database';
import { db } from '../../../config/firebase-config';
import { UserRoles } from '../../../common/enums';

const AdminPanelUsersByRole: FC<{ role: UserRoles }> = ({ role }): ReactElement => {
    const [users, setUsers] = useState<IUserData[] | null>(null);

    const roleData = role === UserRoles.WantAdmin ?
        { heading: 'Admin Applicants:', color: 'brand.blue' } :
        { heading: 'Blocked Users:', color: 'brand.red' };

    useEffect(() => {
        return onValue(query(ref(db, `users`), orderByChild('role'), equalTo(role)), (snapshot) => {
            if (!snapshot.exists()) {
                setUsers([]);
            } else {
                setUsers(Object.values(snapshot.val()));
            }
        });
    }, []);

    return (
        <UserList users={users} badgeColor={roleData.color} heading={roleData.heading} />
    );
};

export default AdminPanelUsersByRole;
