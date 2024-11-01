import { SearchValueContextProvider } from './providers/SearchValueContextProvider';
import { MyQueryClienteProvider } from './providers/MyQueryClienteProvider';
import { AuthProvider } from './providers/AuthProvider';
import Router from './routes/Router';

function App() {
	return (
		<MyQueryClienteProvider>
			<SearchValueContextProvider>
				<AuthProvider>
					<Router />
				</AuthProvider>
			</SearchValueContextProvider>
		</MyQueryClienteProvider>
	);
}

export default App;
