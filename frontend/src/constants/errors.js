export const getFirebaseAuthError = (code) => {
	const errors = {
		'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
		'auth/email-already-in-use': 'El correo ya está en uso',
		'auth/invalid-email': 'El correo no es válido',
		'auth/invalid-credential': 'El correo o la contraseña no son válidos',
		'auth/too-many-requests':
			'Demasiados intentos fallidos, inténtelo de nuevo más tarde',
		'auth/user-disabled': 'El usuario está deshabilitado',
	};

	if (errors[code]) {
		return errors[code];
	}

	return 'Ha ocurrido un error inesperado';
};
