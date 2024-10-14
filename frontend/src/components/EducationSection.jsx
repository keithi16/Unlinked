import { School, X } from 'lucide-react';
import { useState } from 'react';

const EducationSection = ({ userData, isOwnProfile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [educations, setEducations] = useState(userData.education || []);
	const [newEducation, setNewEducation] = useState({
		school: '',
		fieldOfStudy: '',
		startYear: '',
		endYear: '',
	});

	const handleAddEducation = () => {
		if (
			newEducation.school &&
			newEducation.fieldOfStudy &&
			newEducation.startYear
		) {
			setEducations([...educations, newEducation]);
			setNewEducation({
				school: '',
				fieldOfStudy: '',
				startYear: '',
				endYear: '',
			});
		}
	};

	const handleDeleteEducation = (id) => {
		setEducations(educations.filter((edu) => edu._id !== id));
	};

	const handleSave = () => {
		onSave({ education: educations });
		setIsEditing(false);
	};

	return (
		<div className="p-6 mb-6 bg-white rounded-lg shadow">
			<h2 className="mb-4 text-xl font-semibold">Education</h2>
			{educations.map((edu) => (
				<div key={edu._id} className="flex items-start justify-between mb-4">
					<div className="flex items-start">
						<School size={20} className="mt-1 mr-2" />
						<div>
							<h3 className="font-semibold">{edu.fieldOfStudy}</h3>
							<p className="text-gray-600">{edu.school}</p>
							<p className="text-sm text-gray-500">
								{edu.startYear} - {edu.endYear || 'Present'}
							</p>
						</div>
					</div>
					{isEditing && (
						<button
							type="button"
							onClick={() => handleDeleteEducation(edu._id)}
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
						placeholder="School"
						value={newEducation.school}
						onChange={(e) =>
							setNewEducation({ ...newEducation, school: e.target.value })
						}
						className="w-full p-2 mb-2 border rounded"
					/>
					<input
						type="text"
						placeholder="Field of Study"
						value={newEducation.fieldOfStudy}
						onChange={(e) =>
							setNewEducation({ ...newEducation, fieldOfStudy: e.target.value })
						}
						className="w-full p-2 mb-2 border rounded"
					/>
					<input
						type="number"
						placeholder="Start Year"
						value={newEducation.startYear}
						onChange={(e) =>
							setNewEducation({ ...newEducation, startYear: e.target.value })
						}
						className="w-full p-2 mb-2 border rounded"
					/>
					<input
						type="number"
						placeholder="End Year"
						value={newEducation.endYear}
						onChange={(e) =>
							setNewEducation({ ...newEducation, endYear: e.target.value })
						}
						className="w-full p-2 mb-2 border rounded"
					/>
					<button
						type="button"
						onClick={handleAddEducation}
						className="px-4 py-2 text-white transition duration-300 rounded bg-primary hover:bg-primary-dark"
					>
						Add Education
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
						Edit Education
					</button>
				))}
		</div>
	);
};
export default EducationSection;
