import { Input } from 'antd';
import PropTypes from 'prop-types';
import { getImages } from '../../api/images';
import { useQuery } from '@tanstack/react-query';

export default function Searchbar({ className }) {
	const { data: images, isLoading } = useQuery({
		queryKey: 'images',
		queryFn: getImages,
		refetchInterval: 10000,
	});

	const onChange = (e) => {
		console.log(e.target.value);
	};
	console.log(images);

	return (
		<>
			<Input
				placeholder="Hola mundo"
				className={`header ${className}`}
				onChange={onChange}
			/>
			{images?.map((image) => (
				<p key={image?.id}>{image?.url}</p>
			))}
			{isLoading && <p>Cargagando...</p>}
		</>
	);
}

Searchbar.propTypes = {
	className: PropTypes.string,
};
