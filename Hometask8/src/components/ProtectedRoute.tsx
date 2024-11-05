import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, isAllowed }: any) {
    if (!isAllowed) { // Беремо це значення зі стори Redux
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;