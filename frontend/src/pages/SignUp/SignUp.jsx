import { Button, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import * as yup from 'yup';

import { createUserAccount } from '../../api/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function SignUp() {
	const [messageApi, contextHolder] = message.useMessage();
	const navigate = useNavigate();

	const validationSchema = yup.object().shape({
		email: yup
			.string()
			.email('Debe ser un correo electrónico válido')
			.required('Este campo no puede estar vacío'),
		password: yup
			.string()
			.min(6, 'La contraseña debe tener al menos 6 caracteres')
			.required('Este campo no puede estar vacío'),
	});

	const { handleSubmit, control } = useForm({
		resolver: yupResolver(validationSchema),
	});

	const { mutate: createAccount, isPending } = useMutation({
		mutationFn: createUserAccount,
		onError: (err) => {
			messageApi.error(err.message, 10);
		},
		onSuccess: () => {
			navigate('/');
		},
	});

	const onSubmit = async (data) => {
		messageApi.destroy();

		createAccount({ data });
	};

	return (
		<>
			{contextHolder}
			<h2 className="text-2xl font-bold uppercase max-w-sm text-center">
				Regístrarse
			</h2>
			<form
				className="w-full max-w-md flex flex-col gap-4 p-4"
				onSubmit={handleSubmit(onSubmit)}
			>
				<fieldset>
					<label htmlFor="email">Correo electrónico</label>
					<Controller
						name="email"
						control={control}
						render={({ field, fieldState }) => (
							<>
								<Input
									placeholder="Correo electrónico"
									id="email"
									status={fieldState.invalid ? 'error' : ''}
									{...field}
								/>
								{fieldState.error && (
									<small className="text-red-600">
										{fieldState.error.message}
									</small>
								)}
							</>
						)}
					/>
				</fieldset>
				<fieldset>
					<label htmlFor="password">Contraseña</label>
					<Controller
						name="password"
						control={control}
						render={({ field, fieldState }) => (
							<>
								<Input
									type="password"
									placeholder="Contraseña"
									status={fieldState.invalid ? 'error' : ''}
									{...field}
								/>
								{fieldState.error && (
									<small className="text-red-600">
										{fieldState.error.message}
									</small>
								)}
							</>
						)}
					/>
				</fieldset>

				<Button
					type="primary"
					htmlType="submit"
					disabled={isPending}
					loading={isPending}
				>
					Registrarse
				</Button>
				<Link
					to="/auth/signin"
					className="text-blue-600 underline hover:text-blue-800 m-auto"
				>
					¿Ya tienes cuenta? Inicia sesión
				</Link>
			</form>
		</>
	);
}
