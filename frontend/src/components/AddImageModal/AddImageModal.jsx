import { useRef, useState } from 'react';
import { generateImage, saveImage } from '../../api/images';

export default function AddImageModal() {
	const modalRef = useRef(null);
	const [image, setImage] = useState(null);
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

	const onInputChange = (event) => {
		const { name, value } = event.target;

		setFormValue((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const onSubmit = (event) => {
		event.preventDefault();
		generateImage({ alt: formValue.alt })
			.then((res) => {
				setImage(res.image);
				setFormValue((prev) => ({
					...prev,
					searchTerms: res.tags.join(', '),
				}));
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const onSaveButtonClick = () => {
		const data = { ...formValue, image };

		console.log(data);

		saveImage({
			data,
		}).then((res) => {
			console.log(res);
			modalRef?.current?.close();
		});
	};

	return (
		<>
			<button
				onClick={onButtonClick}
				className="fixed bottom-4 right-4 bg-blue-600 rounded-full font-bold text-xl text-white w-12 h-12 flex items-center justify-center shadow-lg hover:brightness-75"
			>
				+
			</button>
			<dialog ref={modalRef} className="m-auto p-4 rounded-lg w-96">
				<header className="w-full flex justify-between mb-2">
					<h2 className="font-bold text-lg">Add Image Modal</h2>
					<button
						onClick={onCloseButtonClick}
						className="bg-slate-400  font-bold p-3 py-1 hover:brightness-75 rounded-full"
					>
						x
					</button>
				</header>
				<form
					className="w-full flex flex-col gap-2"
					onSubmit={onSubmit}
				>
					<fieldset className="w-full">
						<div className="w-full border-slate-400 border-2 border-dashed aspect-video bg-slate-200 shadow-sm rounded-lg flex items-center justify-center relative">
							{image && (
								<img
									src={image?.url}
									alt="Preview"
									className="object-cover w-full h-full absolute"
								/>
							)}
						</div>
						{image && (
							<div className="w-full text-slate-400 p-1 px-2 rounded-tl-lg text-sm">
								{image?.revised_prompt}
							</div>
						)}
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
							readOnly
							value={formValue.searchTerms}
							type="text"
							id="searchTerms"
							className="w-full p-2 border border-slate-400 rounded-lg"
							name="searchTerms"
							placeholder='Separados por comas ","'
						/>
					</fieldset>
					<footer>
						<button
							type="submit"
							className="bg-blue-600 text-white font-bold p-3 py-1 rounded-full hover:brightness-75"
						>
							Generar
						</button>
						<button
							type="button"
							onClick={onSaveButtonClick}
							className="bg-green-600 text-white font-bold p-3 py-1 rounded-full hover:brightness-75"
						>
							Guardar
						</button>
					</footer>
				</form>
			</dialog>
		</>
	);
}
