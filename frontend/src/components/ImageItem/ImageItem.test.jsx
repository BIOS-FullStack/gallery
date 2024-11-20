import { render } from '@testing-library/react';
import { it } from 'vitest';
import { expect } from 'vitest';
import { describe } from 'vitest';
import ImageItem from './ImageItem';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

const mockData = {
	url: 'http://localhost:3000/images/close-up-portrait-yorkshire-dogs.jpg',
	alt: 'Close-up portrait of Yorkshire dogs',
	userName: 'Roberto Quintero',
};

afterEach(() => cleanup());

describe('<ImageItem />', () => {
	it('Renderiza el componente', () => {
		const { container } = render(<ImageItem data={mockData} />);

		expect(container).toBeDefined();
	});
	it('Muestra el nombre del usuario', () => {
		const { getByText } = render(<ImageItem data={mockData} />);
		const userNameContainer = getByText(mockData.userName);

		expect(userNameContainer).toBeDefined();
	});
	it('Muestra el texto "Desconocido" cuando no hay nombre de usuario', () => {
		const { getByText } = render(
			<ImageItem data={{ ...mockData, userName: undefined }} />,
		);

		const userNameContainer = getByText('Desconocido');
		expect(userNameContainer).toBeDefined();
	});
	it('Muestra el alt del imagen', () => {
		const { getByAltText } = render(<ImageItem data={mockData} />);

		const altContainer = getByAltText(mockData.alt);

		expect(altContainer.nodeName).toBe('IMG');
	});
});
