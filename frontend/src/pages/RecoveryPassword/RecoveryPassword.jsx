import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button, Input, message } from 'antd';

import { sendRecoveryPassword } from '../../api/auth';

export default function SignUp() {
	const [messageApi, contextHolder] = message.useMessage();
	const validationSchema = yup.object().shape({
		email: yup
			.string()
			.email('Debe ser un correo electrónico válido')
			.required('Este campo no puede estar vacío'),
	});

	const { handleSubmit, control } = useForm({
		resolver: yupResolver(validationSchema),
	});

	const { mutate: recovery, isPending } = useMutation({
		mutationFn: sendRecoveryPassword,
		onError: (err) => {
			messageApi.error(err.message, 10);
		},
		onSuccess: () => {
			messageApi.success(
				'Se ha enviado un correo a tu correo electrónico',
			);
		},
	});

	const onSubmit = async (data) => {
		messageApi.destroy();

		recovery({ data });
	};

	return (
		<>
			{contextHolder}
			<h2 className="text-2xl font-bold uppercase max-w-sm text-center">
				Recuperar contraseña
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

				<Button
					type="primary"
					htmlType="submit"
					disabled={isPending}
					loading={isPending}
				>
					Enviar correo
				</Button>
				<Link
					to="/auth/signin"
					className="text-blue-600 underline hover:text-blue-800 m-auto"
				>
					Volver a iniciar sesión
				</Link>
			</form>
		</>
	);
}
