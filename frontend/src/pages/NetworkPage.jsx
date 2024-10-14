import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import Sidebar from '../components/Sidebar';
import { UserPlus } from 'lucide-react';
import FriendRequest from '../components/FriendRequest';
import UserCard from '../components/UserCard';

const NetworkPage = () => {
	const { data: user } = useQuery({ queryKey: ['authUser'] });

	const { data: connectionRequests } = useQuery({
		queryKey: ['connectionRequests'],
		queryFn: () => axiosInstance.get('/connections/requests'),
	});

	const { data: connections } = useQuery({
		queryKey: ['connections'],
		queryFn: () => axiosInstance.get('/connections'),
	});

	return (
		<div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
			<div className="col-span-1 lg:col-span-1">
				<Sidebar user={user} />
			</div>
			<div className="col-span-1 lg:col-span-3">
				<div className="p-6 mb-6 rounded-lg shadow bg-secondary">
					<h1 className="mb-6 text-2xl font-bold">My Network</h1>

					{connectionRequests?.data?.length > 0 ? (
						<div className="mb-8">
							<h2 className="mb-2 text-xl font-semibold">Connection Request</h2>
							<div className="space-y-4">
								{connectionRequests.data.map((request) => (
									<FriendRequest key={request.id} request={request} />
								))}
							</div>
						</div>
					) : (
						<div className="p-6 mb-6 text-center bg-white rounded-lg shadow">
							<UserPlus size={48} className="mx-auto mb-4 text-gray-400" />
							<h3 className="mb-2 text-xl font-semibold">
								No Connection Requests
							</h3>
							<p className="text-gray-600">
								You don&apos;t have any pending connection requests at the
								moment.
							</p>
							<p className="mt-2 text-gray-600">
								Explore suggested connections below to expand your network!
							</p>
						</div>
					)}
					{connections?.data?.length > 0 && (
						<div className="mb-8">
							<h2 className="mb-4 text-xl font-semibold">My Connections</h2>
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
								{connections.data.map((connection) => (
									<UserCard
										key={connection._id}
										user={connection}
										isConnection={true}
									/>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
export default NetworkPage;
