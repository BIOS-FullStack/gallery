import Searchbar from '../Searchbar';

import styles from './Header.module.scss';

export default function Header() {
	return (
		<header
			className={`${styles.container} w-full  bg-slate-600 h-96 flex justify-center items-center flex-col gap-4`}
		>
			<div className={styles.background} />
			<h1 className="text-2xl font-bold text-white">
				¡Consigue la imagen que buscas!
			</h1>
			<Searchbar className="max-w-lg" />
		</header>
	);
}
