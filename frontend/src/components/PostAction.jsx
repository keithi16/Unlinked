export default function PostAction({ icon, text, onClick }) {
	return (
		<button type="submit" className="flex items-center" onClick={onClick}>
			<span className="mr-1">{icon}</span>
			<span className="hidden sm:inline">{text}</span>
		</button>
	);
}
