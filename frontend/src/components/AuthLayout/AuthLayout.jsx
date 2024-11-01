import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
	return (
		<div className="grid grid-cols-2 h-screen">
			<div className="bg-slate-900 flex flex-col items-center justify-center gap-4">
				<h1 className="text-2xl text-white font-bold uppercase max-w-sm text-center">
					Bienvenido a nuestra galería de imágenes
				</h1>
				<p className=" max-w-sm text-center font-light text-slate-100">
					!Consigue la imagen que buscas! Nosotros nos encargamos de
					encontrar la imagen que buscas y te lo mostramos en la
					galería de imágenes.
				</p>
			</div>
			<div className="w-full h-full flex flex-col p-4 items-center justify-center">
				<Outlet />
			</div>
		</div>
	);
}

AuthLayout.propTypes = {
	children: PropTypes.node,
};
