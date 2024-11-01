import { useState, useEffect, createContext } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import PropTypes from 'prop-types';
import { useContext } from 'react';

const context = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			setUser(user);
			setIsLoading(false);
		});
	}, []);

	return (
		<context.Provider value={{ user, userLoading: isLoading }}>
			{children}
		</context.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export const useAuth = () => {
	const value = useContext(context);

	return value;
};
