import PropTypes from 'prop-types';

import styles from './ImageItem.module.scss';

export default function ImageItem({ data = {} }) {
	const { url, alt } = data || {};

	return (
		<figure className={styles.container}>
			<img src={url} alt={alt} />
		</figure>
	);
}

ImageItem.propTypes = {
	data: PropTypes.objectOf({
		url: PropTypes.string.isRequired,
		alt: PropTypes.string,
	}).isRequired,
};
