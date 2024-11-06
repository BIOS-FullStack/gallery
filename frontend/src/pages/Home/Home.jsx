import {
	HomeSearch,
	ImagesList,
	GenerateImageModal,
	AddImageModal,
	Layout,
} from '../../components';

export default function Home() {
	return (
		<Layout>
			<HomeSearch />
			<ImagesList />
			<div className="fixed right-4 bottom-4 flex flex-col gap-2">
				<GenerateImageModal />
				<AddImageModal />
			</div>
		</Layout>
	);
}
