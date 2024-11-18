import { expect } from 'vitest';
import { cleanText, sum } from './sum.js';
import { test } from 'vitest';
import { describe } from 'vitest';
import { it } from 'vitest';

describe('Función de suma', () => {
	it('Devuelve el resultado de la suma de dos números', () => {
		expect(sum(1, 2)).toBe(3);
	});
});
describe('Función de limpiar texto', () => {
	it('Deja todo en minúsculas cuando paso false al parámetro capitalize', () => {
		expect(cleanText('hola mundo', false)).toBe('hola mundo');
	});
	test('Que quita espacios en blanco al principio y final', () => {
		expect(cleanText(' hola mundo ', false)).toBe('hola mundo');
	});
	test('Que quita espacios en blanco al principio y final', () => {
		expect(cleanText(' hola mundo ')).toBe('Hola mundo');
	});
});
