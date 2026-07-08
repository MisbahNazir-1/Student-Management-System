import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Agar token maujood hai to page load hone do
    return children;
};

export default ProtectedRoute;
