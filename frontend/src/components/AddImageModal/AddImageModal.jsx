import { useRef, useState } from 'react';

import { generateSearchTerms, saveImage } from '../../api/images';

import { queryClient } from '../../providers/MyQueryClienteProvider';

export default function AddImageModal() {
	const modalRef = useRef(null);
	const [imageURL, setImageURL] = useState(null);
	const [formValue, setFormValue] = useState({
		file: null,
		alt: '',
		searchTerms: '',
	});

	const onButtonClick = () => {
		modalRef?.current?.showModal();
	};

	const onCloseButtonClick = () => {
		modalRef?.current?.close();
	};

	const onInputImageChange = (event) => {
		const url = URL.createObjectURL(event.target.files[0]);

		setImageURL(url);
		setFormValue((prev) => ({
			...prev,
			file: event.target.files[0],
		}));
	};

	const onInputChange = (event) => {
		const { name, value } = event.target;

		setFormValue((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		const searchTerms = await generateSearchTerms(formValue);
		setFormValue((prev) => ({
			...prev,
			searchTerms,
		}));
	};

	const onSaveButtonClick = () => {
		const data = formValue;

		saveImage({
			data,
		}).then((res) => {
			console.log(res);
			modalRef?.current?.close();
			queryClient.invalidateQueries({
				queryKey: ['images'],
			});
		});
	};

	return (
		<>
			<button
				onClick={onButtonClick}
				className="bg-green-600 rounded-full font-bold text-xl text-white w-12 h-12 flex items-center justify-center shadow-lg hover:brightness-75"
			>
				↑
			</button>
			<dialog ref={modalRef} className="m-auto p-4 rounded-lg">
				<header className="w-full flex justify-between mb-2">
					<h2 className="font-bold text-lg">Add Image Modal</h2>
					<button
						onClick={onCloseButtonClick}
						className="bg-slate-400  font-bold p-3 py-1 hover:brightness-75 rounded-full"
					>
						x
					</button>
				</header>
				<form className="flex flex-col gap-2" onSubmit={onSubmit}>
					<fieldset>
						<label htmlFor="image">
							<div className="w-96 border-slate-400 border-2 border-dashed aspect-video bg-slate-200 shadow-sm rounded-lg flex items-center justify-center relative">
								{imageURL && (
									<img
										src={imageURL}
										alt="Preview"
										className="object-cover w-full h-full absolute brightness-50"
									/>
								)}
								<p
									className={`z-10 ${
										imageURL ? 'text-white' : ''
									}`}
								>
									Clic aquí para subir una imagen
								</p>
							</div>
						</label>
						<input
							type="file"
							id="image"
							className="hidden"
							onChange={onInputImageChange}
							accept="image/png, image/jpeg"
							name="file"
						/>
					</fieldset>
					<fieldset>
						<label htmlFor="alt" className="block">
							Texto alternativo (alt)
						</label>
						<textarea
							value={formValue.alt}
							id="alt"
							className="w-full p-2 border border-slate-400 rounded-lg"
							name="alt"
							onChange={onInputChange}
						></textarea>
					</fieldset>
					<fieldset>
						<label htmlFor="searchTerms" className="block">
							Términos de búsqueda
						</label>
						<input
							value={formValue.searchTerms}
							type="text"
							id="searchTerms"
							className="w-full p-2 border border-slate-400 rounded-lg"
							name="searchTerms"
							placeholder='Separados por comas ","'
							onChange={onInputChange}
						/>
					</fieldset>
					<footer className="flex gap-2">
						<button
							type="submit"
							className="bg-blue-600 text-white font-bold p-3 py-1 rounded-full hover:brightness-75"
						>
							Generar
						</button>
						<button
							type="button"
							disabled={!formValue.searchTerms || !formValue?.alt}
							onClick={onSaveButtonClick}
							className={`bg-green-600 text-white font-bold p-3 py-1 rounded-full ${
								formValue.searchTerms && formValue?.alt
									? 'hover:brightness-75'
									: 'grayscale-[100%]'
							}`}
						>
							Guardar
						</button>
					</footer>
				</form>
			</dialog>
		</>
	);
}
