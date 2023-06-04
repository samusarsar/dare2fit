import { FC, useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { AppContext } from '../../context/AppContext/AppContext';


const ProtectedRoute: FC = () => {
    const { user } = useContext(AppContext);
    const location = useLocation();

    if (!user) {
        return <Navigate to={'login'} state={location.pathname} replace={true} />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
