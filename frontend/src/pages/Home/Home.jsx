import {
	Header,
	ImagesList,
	GenerateImageModal,
	AddImageModal,
} from '../../components';

export default function Home() {
	return (
		<>
			<Header />
			<ImagesList />
			<div className="fixed right-4 bottom-4 flex flex-col gap-2">
				<GenerateImageModal />
				<AddImageModal />
			</div>
		</>
	);
}
