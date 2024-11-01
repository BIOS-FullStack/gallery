import { useNavigate } from 'react-router-dom';
import Searchbar from '../Searchbar';

import styles from './Header.module.scss';
import { signOutUser } from '../../api/auth';

export default function Header() {
	const navigate = useNavigate();

	const onSignOutButtonClick = async () => {
		await signOutUser();
		navigate('/auth/signin');
	};

	return (
		<header
			className={`${styles.container} w-full  bg-slate-600 h-96 flex justify-center items-center flex-col gap-4`}
		>
			<div className={styles.background} />
			<nav className="w-full flex justify-end bg-white p-4 fixed top-0">
				<div className="flex gap-4">
					<button onClick={onSignOutButtonClick}>
						Cerrar sesión
					</button>
				</div>
			</nav>
			<h1 className="text-2xl font-bold text-white">
				¡Consigue la imagen que buscas!
			</h1>
			<Searchbar className="max-w-lg" />
		</header>
	);
}
