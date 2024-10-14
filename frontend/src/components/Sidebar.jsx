import { Link } from 'react-router-dom';
import { Home, UserPlus, Bell } from 'lucide-react';

export default function Sidebar({ user }) {
	return (
		<div className="rounded-lg shadow bg-secondary">
			<div className="p-4 text-center">
				<div
					className="h-16 bg-center bg-cover rounded-t-lg"
					style={{
						backgroundImage: `url("${user.bannerImg || '/banner.png'}")`,
					}}
				/>
				<Link to={`/profile/${user.username}`}>
					<img
						src={user.profilePicture || '/avatar.png'}
						alt={user.name}
						className="w-20 h-20 rounded-full mx-auto mt-[-40px]"
					/>
					<h2 className="mt-2 text-xl font-semibold">{user.name}</h2>
				</Link>
				<p className="text-info">{user.headline}</p>
				<p className="text-xs text-info">
					{user.connections.length} connections
				</p>
			</div>
			<div className="p-4 border-t border-base-100">
				<nav>
					<ul className="space-y-2">
						<li>
							<Link
								to="/"
								className="flex items-center px-4 py-2 transition-colors rounded-md hover:bg-primary hover:text-white"
							>
								<Home className="mr-2" size={20} /> Home
							</Link>
						</li>
						<li>
							<Link
								to="/network"
								className="flex items-center px-4 py-2 transition-colors rounded-md hover:bg-primary hover:text-white"
							>
								<UserPlus className="mr-2" size={20} /> My Network
							</Link>
						</li>
						<li>
							<Link
								to="/notifications"
								className="flex items-center px-4 py-2 transition-colors rounded-md hover:bg-primary hover:text-white"
							>
								<Bell className="mr-2" size={20} /> Notifications
							</Link>
						</li>
					</ul>
				</nav>
			</div>
			<div className="p-4 border-t border-base-100">
				<Link
					to={`/profile/${user.username}`}
					className="text-sm font-semibold"
				>
					Visit your profile
				</Link>
			</div>
		</div>
	);
}
