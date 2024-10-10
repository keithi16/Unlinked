import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../lib/axios';
import { Link } from 'react-router-dom';
import { Bell, Home, LogOut, User, Users } from 'lucide-react';

const Navbar = () => {
	const { data: authUser } = useQuery({
		queryKey: ['authUser'],
	});

	const queryClient = useQueryClient();

	const { data: notifications } = useQuery({
		queryKey: ['notifications'],
		queryFn: async () => axiosInstance.get('/notifications'),
		enabled: !!authUser,
	});

	const { data: connectionRequests } = useQuery({
		queryKey: ['connectionRequests'],
		queryFn: async () => axiosInstance.get('/connections/requests'),
		enabled: !!authUser,
	});

	const { mutate: logout } = useMutation({
		mutationFn: () => axiosInstance.post('/auth/logout'),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['authUser'] });
		},
	});

	const unreadNotificationCount = notifications?.data.filter(
		(notif) => !notif.read,
	).lenght;

	const unreadConnectionRequestsCount = connectionRequests?.data?.lenght;

	return (
		<nav className="sticky top-0 z-10 shadow-md bg-secondary">
			<div className="px-4 mx-auto max-w-7xl">
				<div className="flex items-center justify-between py-3">
					<div className="flex items-center space-x-4">
						<Link to="/">
							<img
								className="h-8 rounded"
								src="/small-logo.png"
								alt="LinkedIn"
							/>
						</Link>
					</div>
					<div className="flex items-center gap-2 md:gap-6">
						{authUser ? (
							<>
								<Link
									to={'/'}
									className="flex flex-col items-center text-neutral"
								>
									<Home size={20} />
									<span className="hidden text-xs md:block">Home</span>
								</Link>
								<Link
									to="/network"
									className="relative flex flex-col items-center text-neutral"
								>
									<Users size={20} />
									<span className="hidden text-xs md:block">My Network</span>
									{unreadConnectionRequestsCount > 0 && (
										<span className="absolute flex items-center justify-center text-xs text-white bg-blue-500 rounded-full -top-1 -right-1 md:right-4 size-3 md:size-4">
											{unreadConnectionRequestsCount}
										</span>
									)}
								</Link>
								<Link
									to="/notifications"
									className="relative flex flex-col items-center text-neutral"
								>
									<Bell size={20} />
									<span className="hidden text-xs md:block">Notifications</span>
									{unreadNotificationCount > 0 && (
										<span className="absolute flex items-center justify-center text-xs text-white bg-blue-500 rounded-full -top-1 -right-1 md:right-4 size-3 md:size-4">
											{unreadNotificationCount}
										</span>
									)}
								</Link>
								<Link
									to={`/profile/${authUser.username}`}
									className="flex flex-col items-center text-neutral"
								>
									<User size={20} />
									<span className="hidden text-xs md:block">Me</span>
								</Link>
								<button
									className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800"
									type="button"
									onClick={() => logout()}
								>
									<LogOut size={20} />
									<span className="hidden md:inline">Logout</span>
								</button>
							</>
						) : (
							<>
								<Link to="/login" className="btn btn-ghost">
									Sign In
								</Link>
								<Link to="/signup" className="btn btn-primary">
									Join now
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
