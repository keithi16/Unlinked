import { Link } from 'react-router-dom';

function UserCard({ user, isConnection }) {
	return (
		<div className="flex flex-col items-center p-4 transition-all bg-white rounded-lg shadow hover:shadow-md">
			<Link
				to={`/profile/${user.username}`}
				className="flex flex-col items-center"
			>
				<img
					src={user.profilePicture || '/avatar.png'}
					alt={user.name}
					className="object-cover w-24 h-24 mb-4 rounded-full"
				/>
				<h3 className="text-lg font-semibold text-center">{user.name}</h3>
			</Link>
			<p className="text-center text-gray-600">{user.headline}</p>
			<p className="mt-2 text-sm text-gray-500">
				{user.connections?.length} connections
			</p>
			<button
				type="button"
				className="w-full px-4 py-2 mt-4 text-white transition-colors rounded-md bg-primary hover:bg-primary-dark"
			>
				{isConnection ? 'Connected' : 'Connect'}
			</button>
		</div>
	);
}

export default UserCard;
