import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { SearchValueContextProvider } from './providers/SearchValueContextProvider';
import { MyQueryClienteProvider } from './providers/MyQueryClienteProvider';

import { Home } from './pages';

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
		path: '/signin',
		caseSensitive: false,
		index: true,
		lazy: lazyComponent('SignIn'),
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
