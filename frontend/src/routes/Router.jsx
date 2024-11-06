import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Home, Images } from '../pages';
import AuthLayout from '../components/AuthLayout';
import PrivateRoutes from './PrivateRoutes';
import AuthRoutesGuard from './AuthRoutesGuard';

const lazyComponent = (component) => {
	return async () => {
		const { [component]: Component } = await import('../pages');

		return { Component };
	};
};

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/',
		element: <PrivateRoutes />,
		children: [
			{
				path: '/images',
				element: <Images />,
			},
		],
	},
	{
		path: '/auth',
		element: <AuthRoutesGuard component={AuthLayout} />,
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
