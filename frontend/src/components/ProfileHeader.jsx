import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast';

import { Camera, Clock, MapPin, UserCheck, UserPlus, X } from 'lucide-react';

const ProfileHeader = ({ userData, onSave, isOwnProfile }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedData, setEditedData] = useState({});
	const queryClient = useQueryClient();

	const { data: authUser } = useQuery({ queryKey: ['authUser'] });

	const { data: connectionStatus, refetch: refetchConnectionStatus } = useQuery(
		{
			queryKey: ['connectionStatus', userData._id],
			queryFn: () => axiosInstance.get(`/connections/status/${userData._id}`),
			enabled: !isOwnProfile,
		},
	);

	const isConnected = userData.connections.some(
		(connection) => connection === authUser._id,
	);

	const { mutate: sendConnectionRequest } = useMutation({
		mutationFn: (userId) =>
			axiosInstance.post(`/connections/request/${userId}`),
		onSuccess: () => {
			toast.success('Connection request sent');
			refetchConnectionStatus();
			queryClient.invalidateQueries(['connectionRequests']);
		},
		onError: (error) => {
			toast.error(error.response?.data?.message || 'An error occurred');
		},
	});

	const { mutate: acceptRequest } = useMutation({
		mutationFn: (requestId) =>
			axiosInstance.put(`/connections/accept/${requestId}`),
		onSuccess: () => {
			toast.success('Connection request accepted');
			refetchConnectionStatus();
			queryClient.invalidateQueries(['connectionRequests']);
		},
		onError: (error) => {
			toast.error(error.response?.data?.message || 'An error occurred');
		},
	});

	const { mutate: rejectRequest } = useMutation({
		mutationFn: (requestId) =>
			axiosInstance.put(`/connections/reject/${requestId}`),
		onSuccess: () => {
			toast.success('Connection request rejected');
			refetchConnectionStatus();
			queryClient.invalidateQueries(['connectionRequests']);
		},
		onError: (error) => {
			toast.error(error.response?.data?.message || 'An error occurred');
		},
	});

	const { mutate: removeConnection } = useMutation({
		mutationFn: (userId) => axiosInstance.delete(`/connections/${userId}`),
		onSuccess: () => {
			toast.success('Connection removed');
			refetchConnectionStatus();
			queryClient.invalidateQueries(['connectionRequests']);
		},
		onError: (error) => {
			toast.error(error.response?.data?.message || 'An error occurred');
		},
	});

	const getConnectionStatus = useMemo(() => {
		if (isConnected) return 'connected';
		if (!isConnected) return 'not_connected';
		return connectionStatus?.data?.status;
	}, [isConnected, connectionStatus]);

	const renderConnectionButton = () => {
		const baseClass =
			'text-white py-2 px-4 rounded-full transition duration-300 flex items-center justify-center';
		switch (getConnectionStatus) {
			case 'connected':
				return (
					<div className="flex justify-center gap-2">
						<div className={`${baseClass} bg-green-500 hover:bg-green-600`}>
							<UserCheck size={20} className="mr-2" />
							Connected
						</div>
						<button
							type="button"
							className={`${baseClass} bg-red-500 hover:bg-red-600 text-sm`}
							onClick={() => removeConnection(userData._id)}
						>
							<X size={20} className="mr-2" />
							Remove Connection
						</button>
					</div>
				);

			case 'pending':
				return (
					<button
						type="button"
						className={`${baseClass} bg-yellow-500 hover:bg-yellow-600`}
					>
						<Clock size={20} className="mr-2" />
						Pending
					</button>
				);

			case 'received':
				return (
					<div className="flex justify-center gap-2">
						<button
							type="button"
							onClick={() => acceptRequest(connectionStatus.data.requestId)}
							className={`${baseClass} bg-green-500 hover:bg-green-600`}
						>
							Accept
						</button>
						<button
							type="button"
							onClick={() => rejectRequest(connectionStatus.data.requestId)}
							className={`${baseClass} bg-red-500 hover:bg-red-600`}
						>
							Reject
						</button>
					</div>
				);
			default:
				return (
					<button
						type="button"
						onClick={() => sendConnectionRequest(userData._id)}
						className="flex items-center justify-center px-4 py-2 text-white transition duration-300 rounded-full bg-primary hover:bg-primary-dark"
					>
						<UserPlus size={20} className="mr-2" />
						Connect
					</button>
				);
		}
	};

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setEditedData((prev) => ({
					...prev,
					[event.target.name]: reader.result,
				}));
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSave = () => {
		onSave(editedData);
		setIsEditing(false);
	};

	return (
		<div className="mb-6 bg-white rounded-lg shadow">
			<div
				className="relative h-48 bg-center bg-cover rounded-t-lg"
				style={{
					backgroundImage: `url('${editedData.bannerImg || userData.bannerImg || '/banner.png'}')`,
				}}
			>
				{isEditing && (
					<label className="absolute p-2 bg-white rounded-full shadow cursor-pointer top-2 right-2">
						<Camera size={20} />
						<input
							type="file"
							className="hidden"
							name="bannerImg"
							onChange={handleImageChange}
							accept="image/*"
						/>
					</label>
				)}
			</div>

			<div className="p-4">
				<div className="relative mb-4 -mt-20">
					<img
						className="object-cover w-32 h-32 mx-auto rounded-full"
						src={
							editedData.profilePicture ||
							userData.profilePicture ||
							'/avatar.png'
						}
						alt={userData.name}
					/>

					{isEditing && (
						<label className="absolute bottom-0 p-2 transform translate-x-16 bg-white rounded-full shadow cursor-pointer right-1/2">
							<Camera size={20} />
							<input
								type="file"
								className="hidden"
								name="profilePicture"
								onChange={handleImageChange}
								accept="image/*"
							/>
						</label>
					)}
				</div>

				<div className="mb-4 text-center">
					{isEditing ? (
						<input
							type="text"
							value={editedData.name ?? userData.name}
							onChange={(e) =>
								setEditedData({ ...editedData, name: e.target.value })
							}
							className="w-full mb-2 text-2xl font-bold text-center"
						/>
					) : (
						<h1 className="mb-2 text-2xl font-bold">{userData.name}</h1>
					)}

					{isEditing ? (
						<input
							type="text"
							value={editedData.headline ?? userData.headline}
							onChange={(e) =>
								setEditedData({ ...editedData, headline: e.target.value })
							}
							className="w-full text-center text-gray-600"
						/>
					) : (
						<p className="text-gray-600">{userData.headline}</p>
					)}

					<div className="flex items-center justify-center mt-2">
						<MapPin size={16} className="mr-1 text-gray-500" />
						{isEditing ? (
							<input
								type="text"
								value={editedData.location ?? userData.location}
								onChange={(e) =>
									setEditedData({ ...editedData, location: e.target.value })
								}
								className="text-center text-gray-600"
							/>
						) : (
							<span className="text-gray-600">{userData.location}</span>
						)}
					</div>
				</div>

				{isOwnProfile ? (
					isEditing ? (
						<button
							type="button"
							className="w-full px-4 py-2 text-white transition duration-300 rounded-full bg-primary hover:bg-primary-dark"
							onClick={handleSave}
						>
							Save Profile
						</button>
					) : (
						<button
							type="button"
							onClick={() => setIsEditing(true)}
							className="w-full px-4 py-2 text-white transition duration-300 rounded-full bg-primary hover:bg-primary-dark"
						>
							Edit Profile
						</button>
					)
				) : (
					<div className="flex justify-center">{renderConnectionButton()}</div>
				)}
			</div>
		</div>
	);
};
export default ProfileHeader;
