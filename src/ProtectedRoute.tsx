import { Navigate } from 'react-router-dom';
import { useAuth } from './context/authContext';
import { ReactNode } from 'react';

type ProtectedRouteProps = {
	children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
	const { isAuthenticated } = useAuth();
	if (!isAuthenticated) {
		return <Navigate to="/login" />;
	}

	return children;
}

export default ProtectedRoute;
