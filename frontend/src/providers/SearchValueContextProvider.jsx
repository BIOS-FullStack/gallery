import { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { useContext } from 'react';

export const searchValueContext = createContext();

export const useSearchValue = () => {
	const { searchValue, setSearchValue } = useContext(searchValueContext);

	return { value: searchValue, setValue: setSearchValue };
};

export const SearchValueContextProvider = ({ children }) => {
	const [searchValue, setSearchValue] = useState('');

	return (
		<searchValueContext.Provider value={{ searchValue, setSearchValue }}>
			{children}
		</searchValueContext.Provider>
	);
};

SearchValueContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
