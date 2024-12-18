import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Spin } from 'antd';

import { useAuth } from '../providers/AuthProvider';

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
