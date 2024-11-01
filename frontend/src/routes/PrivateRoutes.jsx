import { Outlet } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Spin } from 'antd';

export default function PrivateRoutes() {
	const navigate = useNavigate();
	const { user, userLoading } = useAuth();

	useEffect(() => {
		if (!user && !userLoading) {
			navigate('/auth/signin');
		}
	}, [user, userLoading, navigate]);

	if (!user) {
		return (
			<div className="w-full h-screen flex flex-col items-center justify-center">
				<Spin size="large" />
			</div>
		);
	}

	return <Outlet />;
}
