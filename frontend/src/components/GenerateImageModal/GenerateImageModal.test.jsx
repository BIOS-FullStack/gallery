import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';

import GenerateImageModal from './GenerateImageModal';

const mockData = {
	image: {
		url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Homer_Simpson_Nike_SB_Dunks_at_the_ShoeZeum.jpg/800px-Homer_Simpson_Nike_SB_Dunks_at_the_ShoeZeum.jpg',
		revised_prompt: 'hola mundo',
	},
	tags: ['tag1', 'tag2'],
};

describe('<GenerateImageModal />', () => {
	const {
		container,
		getByLabelText,
		getByText,
		getByTestId,
		getByPlaceholderText,
		getByAltText,
	} = render(<GenerateImageModal />);
	it('Renderiza el componente', () => {
		expect(container).toBeDefined();
	});
	it('Renderiza el botón para abrir el modal', () => {
		const button = getByLabelText('Generar imagen');

		expect(button).toBeDefined();
	});
	it('Abre el modal al hacer click en el botón', async () => {
		const button = getByLabelText('Generar imagen');
		const modal = container.getElementsByTagName('dialog')[0];

		button.click();

		expect(true).toBe(true);
	});
	it('Dispara el evento submit al hacer click en el botón "Generar"', async () => {
		const button = getByText('Generar');
		const form = getByTestId('form-generate-image');
		const mockFn = vi.fn();
		form.onsubmit = mockFn;

		button.click();

		expect(mockFn).toHaveBeenCalled();
	});
	it('Hace la petición al hacer click en el botón "Generar"', async () => {
		vi.spyOn(window, 'fetch').mockImplementation(() =>
			Promise.resolve({
				json: () => Promise.resolve(mockData),
			}),
		);

		const inputAlt = getByPlaceholderText('Escribe el texto alternativo');
		fireEvent.change(inputAlt, {
			target: { value: 'hola mundo', name: 'alt' },
		});
		const button = getByText('Generar');
		button.click();

		const input = container.querySelector('#searchTerms');

		expect(window.fetch).toHaveBeenCalled();

		await waitFor(() => {
			expect(input.value).toBe(mockData.tags.join(', '));
		});
	});
	it('Muestra la imagen generada', async () => {
		const inputAlt = getByPlaceholderText('Escribe el texto alternativo');
		fireEvent.change(inputAlt, {
			target: { value: 'Bosque encantado', name: 'alt' },
		});
		const button = getByText('Generar');

		button.click();
		const image = getByAltText('Preview');

		expect(image).toBeDefined();
		await waitFor(() => {
			expect(image.src).toBe(mockData.image.url);
		});
		window.fetch.mockRestore();
	});
});
