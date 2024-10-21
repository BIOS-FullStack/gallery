import { Input } from 'antd';
import { useState } from 'react';

export default function SignUp() {
	const [formValue, setFormValue] = useState({
		name: '',
		email: '',
		password: '',
	});

	console.log(formValue);

	const onInputChange = (event) => {
		const { name, value } = event.target;

		setFormValue((curr) => ({
			...curr,
			[name]: value,
		}));
	};

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
			<div className="">
				<form className="flex flex-col gap-4 p-4">
					<fieldset>
						<label htmlFor="email">Correo electrónico</label>
						<Input
							type="email"
							placeholder="Correo electrónico"
							name="email"
							onChange={onInputChange}
						/>
					</fieldset>
					<fieldset>
						<label htmlFor="password">Contraseña</label>
						<Input
							type="password"
							placeholder="Contraseña"
							name="password"
							onChange={onInputChange}
						/>
					</fieldset>
				</form>
			</div>
		</div>
	);
}
