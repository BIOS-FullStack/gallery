import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { SearchValueContextProvider } from './providers/SearchValueContextProvider';
import { MyQueryClienteProvider } from './providers/MyQueryClienteProvider';

import { Home } from './pages';

import AuthLayout from './components/AuthLayout';

const lazyComponent = (component) => {
	return async () => {
		const { [component]: Component } = await import('./pages');

		return { Component };
	};
};

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
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

function App() {
	return (
		<MyQueryClienteProvider>
			<SearchValueContextProvider>
				<RouterProvider router={router} />
			</SearchValueContextProvider>
		</MyQueryClienteProvider>
	);
}

export default App;
