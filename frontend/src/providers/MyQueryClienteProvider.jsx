import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PropTypes from 'prop-types';

export const queryClient = new QueryClient();

export function MyQueryClienteProvider({ children }) {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
}

MyQueryClienteProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
