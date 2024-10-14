import { X } from 'lucide-react';
import { useState } from 'react';

const SkillsSection = ({ userData, isOwnProfile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [skills, setSkills] = useState(userData.skills || []);
	const [newSkill, setNewSkill] = useState('');

	const handleAddSkill = () => {
		if (newSkill && !skills.includes(newSkill)) {
			setSkills([...skills, newSkill]);
			setNewSkill('');
		}
	};

	const handleDeleteSkill = (skill) => {
		setSkills(skills.filter((s) => s !== skill));
	};

	const handleSave = () => {
		onSave({ skills });
		setIsEditing(false);
	};

	return (
		<div className="p-6 bg-white rounded-lg shadow">
			<h2 className="mb-4 text-xl font-semibold">Skills</h2>
			<div className="flex flex-wrap">
				{skills.map((skill, index) => (
					<span
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={index}
						className="flex items-center px-3 py-1 mb-2 mr-2 text-sm text-gray-700 bg-gray-200 rounded-full"
					>
						{skill}
						{isEditing && (
							<button
								type="button"
								onClick={() => handleDeleteSkill(skill)}
								className="ml-2 text-red-500"
							>
								<X size={14} />
							</button>
						)}
					</span>
				))}
			</div>

			{isEditing && (
				<div className="flex mt-4">
					<input
						type="text"
						placeholder="New Skill"
						value={newSkill}
						onChange={(e) => setNewSkill(e.target.value)}
						className="flex-grow p-2 border rounded-l"
					/>
					<button
						type="button"
						onClick={handleAddSkill}
						className="px-4 py-2 text-white transition duration-300 rounded-r bg-primary hover:bg-primary-dark"
					>
						Add Skill
					</button>
				</div>
			)}

			{isOwnProfile &&
				(isEditing ? (
					<button
						type="button"
						onClick={handleSave}
						className="px-4 py-2 mt-4 text-white transition duration-300 rounded bg-primary hover:bg-primary-dark"
					>
						Save Changes
					</button>
				) : (
					<button
						type="button"
						onClick={() => setIsEditing(true)}
						className="mt-4 transition duration-300 text-primary hover:text-primary-dark"
					>
						Edit Skills
					</button>
				))}
		</div>
	);
};
export default SkillsSection;
