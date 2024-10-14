import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import Sidebar from '../components/Sidebar';
import PostCreation from '../components/PostCreation';
import Post from '../components/Post';
import { Users } from 'lucide-react';
import RecommendedUser from '../components/RecommendedUser';

const HomePage = () => {
	const { data: authUser } = useQuery({
		queryKey: ['authUser'],
	});

	const { data: recommendedUsers } = useQuery({
		queryKey: ['recommendedUsers'],
		queryFn: async () => {
			try {
				const res = await axiosInstance.get('/users/suggestions');
				return res.data;
			} catch (err) {
				toast.error(err.response.data.message || 'Something went wrong');
			}
		},
	});

	const { data: posts } = useQuery({
		queryKey: ['posts'],
		queryFn: async () => {
			const res = await axiosInstance.get('/posts');
			return res.data;
		},
	});

	return (
		<div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
			<div className="hidden lg:block lg:col-span-1">
				<Sidebar user={authUser} />
			</div>

			<div className="order-first col-span-1 lg:col-span-2 lg:order-none">
				<PostCreation user={authUser} />

				{posts?.map((post) => (
					<Post key={post._id} post={post} />
				))}

				{posts?.length === 0 && (
					<div className="p-8 text-center bg-white rounded-lg shadow">
						<div className="mb-6">
							<Users size={64} className="mx-auto text-blue-500" />
						</div>
						<h2 className="mb-4 text-2xl font-bold text-gray-800">
							No Posts Yet
						</h2>
						<p className="mb-6 text-gray-600">
							Connect with others to start seeing posts in your feed!
						</p>
					</div>
				)}
			</div>

			{recommendedUsers?.length > 0 && (
				<div className="hidden col-span-1 lg:col-span-1 lg:block">
					<div className="p-4 rounded-lg shadow bg-secondary">
						<h2 className="mb-4 font-semibold">People you may know</h2>
						{recommendedUsers?.map((user) => (
							<RecommendedUser key={user._id} user={user} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default HomePage;
