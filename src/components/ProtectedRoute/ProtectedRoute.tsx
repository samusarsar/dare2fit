import { FC, useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { AppContext } from '../../context/AppContext/AppContext';


const ProtectedRoute: FC = () => {
    const { user, userData } = useContext(AppContext);
    const location = useLocation();

    const toLoginOrSignup = location.pathname === '/login' || location.pathname === '/signup';

    if (!user) {
        return !toLoginOrSignup ? <Navigate to={'login'} state={location.pathname} replace={true} /> :
            <Outlet />;
    } else {
        return toLoginOrSignup ? <Navigate to={`profile/${userData!.handle}`} state={location.pathname} replace={true} /> :
            <Outlet />;
    }
};

export default ProtectedRoute;
