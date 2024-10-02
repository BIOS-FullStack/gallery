import { useEffect, useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import Searchbar from '../Searchbar';

import styles from './Header.module.scss';

export default function Header() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const auth = getAuth();

		auth.onAuthStateChanged((user) => {
			setUser(user);
		});
	}, []);

	const onSignInButtonClick = async () => {
		const auth = getAuth();
		const provider = new GoogleAuthProvider();

		const res = await signInWithPopup(auth, provider);

		console.log(res);
	};

	console.log(user);

	return (
		<header
			className={`${styles.container} w-full  bg-slate-600 h-96 flex justify-center items-center flex-col gap-4`}
		>
			<div className={styles.background} />
			<nav className="w-full flex justify-end bg-white p-4 fixed top-0">
				<div className="flex gap-4">
					{!user ? (
						<button onClick={onSignInButtonClick}>
							Iniciar Sesión
						</button>
					) : (
						<div className="flex gap-2 items-center">
							<img
								src={user?.photoURL}
								alt={user?.displayName}
								className="w-8 h-8 rounded-full"
							/>
							<span>{user.displayName}</span>
						</div>
					)}
				</div>
			</nav>
			<h1 className="text-2xl font-bold text-white">
				¡Consigue la imagen que buscas!
			</h1>
			<Searchbar className="max-w-lg" />
		</header>
	);
}
