import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Spin } from 'antd';

import { useAuth } from '../providers/AuthProvider';
import PropTypes from 'prop-types';

export default function AuthRoutesGuard({ component: Component }) {
	const navigate = useNavigate();
	const { user, userLoading } = useAuth();

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [user, userLoading, navigate]);

	if (userLoading || user) {
		return (
			<div className="w-full h-screen flex flex-col items-center justify-center">
				<Spin size="large" />
			</div>
		);
	}

	return <Component />;
}

AuthRoutesGuard.propTypes = {
	component: PropTypes.node.isRequired,
};
