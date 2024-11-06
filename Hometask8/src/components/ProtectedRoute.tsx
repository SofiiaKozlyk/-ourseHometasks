import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, isAllowed }: any) {
    if (!isAllowed) { 
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;