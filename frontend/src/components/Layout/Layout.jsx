import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, Popover } from 'antd';

import { signOutUser } from '../../api/auth';

import { useAuth } from '../../providers/AuthProvider';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Layout({ children }) {
	const navigate = useNavigate();
	const { user } = useAuth();

	const onSignOutButtonClick = async () => {
		await signOutUser();
		navigate('/auth/signin');
	};

	const userName = useMemo(() => {
		return user?.displayName || user?.email || 'Unknown';
	}, [user]);

	return (
		<main className="w-full h-screen flex flex-col">
			<header className="bg-white p-2 w-full flex justify-between items-center sticky top-0 z-10 shadow">
				<h1 className="text-2xl font-bold text-slate-900">
					BIOS GALLERY
				</h1>
				<nav className="flex justify-end ">
					{!!user && (
						<Popover
							content={
								<div className="flex flex-col gap-2">
									<Link to="/">Inicio</Link>
									<Link to="/images">Ver mis imágenes</Link>
									<button
										className="w-full text-left"
										onClick={onSignOutButtonClick}
									>
										Cerrar sesión
									</button>
								</div>
							}
							title={userName}
							trigger="click"
						>
							<Avatar
								src={user.photoURL}
								style={{ cursor: 'pointer' }}
							>
								{userName[0]?.toUpperCase()}
							</Avatar>
						</Popover>
					)}
				</nav>
			</header>
			<section>{children}</section>
		</main>
	);
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};
