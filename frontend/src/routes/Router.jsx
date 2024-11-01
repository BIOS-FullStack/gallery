import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Home } from '../pages';
import AuthLayout from '../components/AuthLayout';
import PrivateRoutes from './PrivateRoutes';

const lazyComponent = (component) => {
	return async () => {
		const { [component]: Component } = await import('../pages');

		return { Component };
	};
};

const router = createBrowserRouter([
	{
		path: '/',
		element: <PrivateRoutes />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
		],
	},
	{
		path: '/auth',
		Component: AuthLayout,
		children: [
			{
				path: 'signin',
				lazy: lazyComponent('SignIn'),
			},
			{
				path: 'signup',
				lazy: lazyComponent('SignUp'),
			},
			{
				path: 'recovery',
				lazy: lazyComponent('RecoveryPassword'),
			},
		],
	},
]);

export default function Router() {
	return <RouterProvider router={router} />;
}
