import {
	AddImageModal,
	GenerateImageModal,
	ImagesList,
	Layout,
} from '../../components';
import { useAuth } from '../../providers/AuthProvider';

export default function Images() {
	const { user } = useAuth();

	return (
		<Layout>
			<ImagesList userId={user?.uid} />
			<div className="fixed right-4 bottom-4 flex flex-col gap-2">
				<GenerateImageModal />
				<AddImageModal />
			</div>
		</Layout>
	);
}
