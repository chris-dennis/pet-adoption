import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
    const { auth } = useContext(AuthContext);

    return auth ? <Outlet {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;