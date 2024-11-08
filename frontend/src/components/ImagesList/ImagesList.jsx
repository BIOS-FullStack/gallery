import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getImages } from '../../api/images';

import { useSearchValue } from '../../providers/SearchValueContextProvider';

import ImageItem from '../ImageItem';
import PropTypes from 'prop-types';

export default function ImagesList({ userId }) {
	const { value } = useSearchValue();

	const {
		data: images,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ['images', userId],
		queryFn: () => getImages({ query: value, userId }),
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		refetch();
	}, [value, refetch]);

	return (
		<div className="flex p-4 gap-4">
			{images?.map((image) => (
				<ImageItem key={image?.id} data={image} />
			))}
			{isLoading && <p>Cargando...</p>}
		</div>
	);
}

ImagesList.propTypes = {
	userId: PropTypes.string,
};
