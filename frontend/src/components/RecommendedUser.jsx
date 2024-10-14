import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Check, Clock, UserCheck, UserPlus, X } from 'lucide-react';

const RecommendedUser = ({ user }) => {
	const queryClient = useQueryClient();

	const { data: connectionStatus, isLoading } = useQuery({
		queryKey: ['connectionStatus', user._id],
		queryFn: () => axiosInstance.get(`/connections/status/${user._id}`),
	});

	const { mutate: sendConnectionRequest } = useMutation({
		mutationFn: (userId) =>
			axiosInstance.post(`/connections/request/${userId}`),
		onSuccess: () => {
			toast.success('Connection request sent successfully');
			queryClient.invalidateQueries({
				queryKey: ['connectionStatus', user._id],
			});
		},
		onError: (error) => {
			toast.error(error.response?.data?.error || 'An error occurred');
		},
	});

	const { mutate: acceptRequest } = useMutation({
		mutationFn: (requestId) =>
			axiosInstance.put(`/connections/accept/${requestId}`),
		onSuccess: () => {
			toast.success('Connection request accepted');
			queryClient.invalidateQueries({
				queryKey: ['connectionStatus', user._id],
			});
		},
		onError: (error) => {
			toast.error(error.response?.data?.error || 'An error occurred');
		},
	});

	const { mutate: rejectRequest } = useMutation({
		mutationFn: (requestId) =>
			axiosInstance.put(`/connections/reject/${requestId}`),
		onSuccess: () => {
			toast.success('Connection request rejected');
			queryClient.invalidateQueries({
				queryKey: ['connectionStatus', user._id],
			});
		},
		onError: (error) => {
			toast.error(error.response?.data?.error || 'An error occurred');
		},
	});

	const renderButton = () => {
		if (isLoading) {
			return (
				<button
					type="button"
					className="px-3 py-1 text-sm text-gray-500 bg-gray-200 rounded-full"
					disabled
				>
					Loading...
				</button>
			);
		}

		switch (connectionStatus?.data?.status) {
			case 'pending':
				return (
					<button
						type="button"
						className="flex items-center px-3 py-1 text-sm text-white bg-yellow-500 rounded-full"
						disabled
					>
						<Clock size={16} className="mr-1" />
						Pending
					</button>
				);
			case 'received':
				return (
					<div className="flex justify-center gap-2">
						<button
							type="button"
							onClick={() => acceptRequest(connectionStatus.data.requestId)}
							className={
								'rounded-full p-1 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white'
							}
						>
							<Check size={16} />
						</button>
						<button
							type="button"
							onClick={() => rejectRequest(connectionStatus.data.requestId)}
							className={
								'rounded-full p-1 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white'
							}
						>
							<X size={16} />
						</button>
					</div>
				);
			case 'connected':
				return (
					<button
						type="button"
						className="flex items-center px-3 py-1 text-sm text-white bg-green-500 rounded-full"
						disabled
					>
						<UserCheck size={16} className="mr-1" />
						Connected
					</button>
				);
			default:
				return (
					<button
						type="button"
						className="flex items-center px-3 py-1 text-sm transition-colors duration-200 border rounded-full border-primary text-primary hover:bg-primary hover:text-white"
						onClick={handleConnect}
					>
						<UserPlus size={16} className="mr-1" />
						Connect
					</button>
				);
		}
	};

	const handleConnect = () => {
		if (connectionStatus?.data?.status === 'not_connected') {
			sendConnectionRequest(user._id);
		}
	};

	return (
		<div className="flex items-center justify-between mb-4">
			<Link
				to={`/profile/${user.username}`}
				className="flex items-center flex-grow"
			>
				<img
					src={user.profilePicture || '/avatar.png'}
					alt={user.name}
					className="w-12 h-12 mr-3 rounded-full"
				/>
				<div>
					<h3 className="text-sm font-semibold">{user.name}</h3>
					<p className="text-xs text-info">{user.headline}</p>
				</div>
			</Link>
			{renderButton()}
		</div>
	);
};
export default RecommendedUser;
