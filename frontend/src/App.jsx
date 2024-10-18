import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Home } from './pages';
import { SearchValueContextProvider } from './contexts/SearchValueContext';

export const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<SearchValueContextProvider>
				<Home />
			</SearchValueContextProvider>
		</QueryClientProvider>
	);
}

export default App;
