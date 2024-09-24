import { Input } from 'antd';
import PropTypes from 'prop-types';

import { useSearchValue } from '../../contexts/SearchValueContext';

const { Search } = Input;

export default function Searchbar({ className }) {
	const { setValue } = useSearchValue();

	return (
		<Search
			className={className}
			placeholder="Encuentra todas las imagenes"
			allowClear
			enterButton="Buscar"
			size="large"
			onSearch={setValue}
		/>
	);
}

Searchbar.propTypes = {
	className: PropTypes.string,
};
