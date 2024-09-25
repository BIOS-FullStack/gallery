import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getImages } from '../../api/images';

import { useSearchValue } from '../../contexts/SearchValueContext';

import ImageItem from '../ImageItem';

export default function ImagesList() {
	const { value } = useSearchValue();

	const {
		data: images,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ['images'],
		queryFn: () => getImages({ query: value }),
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
			{isLoading && <p>Cargagando...</p>}
		</div>
	);
}
