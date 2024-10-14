import { useState } from 'react';

const AboutSection = ({ userData, isOwnProfile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [about, setAbout] = useState(userData.about || '');

	const handleSave = () => {
		setIsEditing(false);
		onSave({ about });
	};
	return (
		<div className="p-6 mb-6 bg-white rounded-lg shadow">
			<h2 className="mb-4 text-xl font-semibold">About</h2>
			{isOwnProfile &&
				(isEditing ? (
					<>
						<textarea
							value={about}
							onChange={(e) => setAbout(e.target.value)}
							className="w-full p-2 border rounded"
							rows="4"
						/>
						<button
							type="button"
							onClick={handleSave}
							className="px-4 py-2 mt-2 text-white transition duration-300 rounded bg-primary hover:bg-primary-dark"
						>
							Save
						</button>
					</>
				) : (
					<>
						<p>{userData.about}</p>
						<button
							type="button"
							onClick={() => setIsEditing(true)}
							className="mt-2 transition duration-300 text-primary hover:text-primary-dark"
						>
							Edit
						</button>
					</>
				))}
		</div>
	);
};
export default AboutSection;
