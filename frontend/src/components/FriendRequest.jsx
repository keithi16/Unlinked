import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const FriendRequest = ({ request }) => {
	const queryClient = useQueryClient();

	const { mutate: acceptConnectionRequest } = useMutation({
		mutationFn: (requestId) =>
			axiosInstance.put(`/connections/accept/${requestId}`),
		onSuccess: () => {
			toast.success('Connection request accepted');
			queryClient.invalidateQueries({ queryKey: ['connectionRequests'] });
		},
		onError: (error) => {
			toast.error(error.response.data.error);
		},
	});

	const { mutate: rejectConnectionRequest } = useMutation({
		mutationFn: (requestId) =>
			axiosInstance.put(`/connections/reject/${requestId}`),
		onSuccess: () => {
			toast.success('Connection request rejected');
			queryClient.invalidateQueries({ queryKey: ['connectionRequests'] });
		},
		onError: (error) => {
			toast.error(error.response.data.error);
		},
	});

	return (
		<div className="flex items-center justify-between p-4 transition-all bg-white rounded-lg shadow hover:shadow-md">
			<div className="flex items-center gap-4">
				<Link to={`/profile/${request.sender.username}`}>
					<img
						src={request.sender.profilePicture || '/avatar.png'}
						alt={request.name}
						className="object-cover w-16 h-16 rounded-full"
					/>
				</Link>

				<div>
					<Link
						to={`/profile/${request.sender.username}`}
						className="text-lg font-semibold"
					>
						{request.sender.name}
					</Link>
					<p className="text-gray-600">{request.sender.headline}</p>
				</div>
			</div>

			<div className="space-x-2">
				<button
					type="button"
					className="px-4 py-2 text-white transition-colors rounded-md bg-primary hover:bg-primary-dark"
					onClick={() => acceptConnectionRequest(request._id)}
				>
					Accept
				</button>
				<button
					type="button"
					className="px-4 py-2 text-gray-800 transition-colors bg-gray-200 rounded-md hover:bg-gray-300"
					onClick={() => rejectConnectionRequest(request._id)}
				>
					Reject
				</button>
			</div>
		</div>
	);
};
export default FriendRequest;
