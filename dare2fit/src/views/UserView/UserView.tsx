import React from "react";
import { useParams } from "react-router";

const UserView: React.FC = () => {
    const { user } = useParams();

    return (
        <p>User: {user}</p>
    );
};

export default UserView;