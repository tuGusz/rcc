import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" />;
    }

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now()/1000

        if (decodedToken.exp < currentTime) {
            localStorage.removeItem('token');
            return <Navigate to="/login" />
        }

        return children

    } catch (error) {
        localStorage.removeItem('token');
        return <Navigate to="/login" />;
    }

}

export default ProtectedRoute