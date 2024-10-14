import { Briefcase, X } from 'lucide-react';
import { useState } from 'react';
import { formatDate } from '../utils/dateUtils';

const ExperienceSection = ({ userData, isOwnProfile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [experiences, setExperiences] = useState(userData.experience || []);
	const [newExperience, setNewExperience] = useState({
		title: '',
		company: '',
		startDate: '',
		endDate: '',
		description: '',
		currentlyWorking: false,
	});

	const handleAddExperience = () => {
		if (
			newExperience.title &&
			newExperience.company &&
			newExperience.startDate
		) {
			setExperiences([...experiences, newExperience]);

			setNewExperience({
				title: '',
				company: '',
				startDate: '',
				endDate: '',
				description: '',
				currentlyWorking: false,
			});
		}
	};

	const handleDeleteExperience = (id) => {
		setExperiences(experiences.filter((exp) => exp._id !== id));
	};

	const handleSave = () => {
		onSave({ experience: experiences });
		setIsEditing(false);
	};

	const handleCurrentlyWorkingChange = (e) => {
		setNewExperience({
			...newExperience,
			currentlyWorking: e.target.checked,
			endDate: e.target.checked ? '' : newExperience.endDate,
		});
	};

	return (
		<div className="p-6 mb-6 bg-white rounded-lg shadow">
			<h2 className="mb-4 text-xl font-semibold">Experience</h2>
			{experiences.map((exp) => (
				<div key={exp._id} className="flex items-start justify-between mb-4">
					<div className="flex items-start">
						<Briefcase size={20} className="mt-1 mr-2" />
						<div>
							<h3 className="font-semibold">{exp.title}</h3>
							<p className="text-gray-600">{exp.company}</p>
							<p className="text-sm text-gray-500">
								{formatDate(exp.startDate)} -{' '}
								{exp.endDate ? formatDate(exp.endDate) : 'Present'}
							</p>
							<p className="text-gray-700">{exp.description}</p>
						</div>
					</div>
					{isEditing && (
						<button
							type="button"
							onClick={() => handleDeleteExperience(exp._id)}
							className="text-red-500"
						>
							<X size={20} />
						</button>
					)}
				</div>
			))}

			{isEditing && (
				<div className="mt-4">
					<input
						type="text"
						placeholder="Title"
						value={newExperience.title}
						onChange={(e) =>
							setNewExperience({ ...newExperience, title: e.target.value })
						}
						className="w-full p-2 mb-2 border rounded"
					/>
					<input
						type="text"
						placeholder="Company"
						value={newExperience.company}
						onChange={(e) =>
							setNewExperience({ ...newExperience, company: e.target.value })
						}
						className="w-full p-2 mb-2 border rounded"
					/>
					<input
						type="date"
						placeholder="Start Date"
						value={newExperience.startDate}
						onChange={(e) =>
							setNewExperience({ ...newExperience, startDate: e.target.value })
						}
						className="w-full p-2 mb-2 border rounded"
					/>
					<div className="flex items-center mb-2">
						<input
							type="checkbox"
							id="currentlyWorking"
							checked={newExperience.currentlyWorking}
							onChange={handleCurrentlyWorkingChange}
							className="mr-2"
						/>
						<label htmlFor="currentlyWorking">I currently work here</label>
					</div>
					{!newExperience.currentlyWorking && (
						<input
							type="date"
							placeholder="End Date"
							value={newExperience.endDate}
							onChange={(e) =>
								setNewExperience({ ...newExperience, endDate: e.target.value })
							}
							className="w-full p-2 mb-2 border rounded"
						/>
					)}
					<textarea
						placeholder="Description"
						value={newExperience.description}
						onChange={(e) =>
							setNewExperience({
								...newExperience,
								description: e.target.value,
							})
						}
						className="w-full p-2 mb-2 border rounded"
					/>
					<button
						type="button"
						onClick={handleAddExperience}
						className="px-4 py-2 text-white transition duration-300 rounded bg-primary hover:bg-primary-dark"
					>
						Add Experience
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
						Edit Experiences
					</button>
				))}
		</div>
	);
};
export default ExperienceSection;
