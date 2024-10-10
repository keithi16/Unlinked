import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../lib/axios';
import toast from 'react-hot-toast';
import { Loader } from 'lucide-react';
import { useState } from 'react';

const LoginForm = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const queryClient = useQueryClient();

	const { mutate: loginMutation, isLoading } = useMutation({
		mutationFn: (userData) => axiosInstance.post('/auth/login', userData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['authUser'] });
		},
		onError: (err) => {
			toast.error(err.response.message || 'Something went wrong');
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		loginMutation({ username, password });
	};

	return (
		<form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
			<input
				type="text"
				placeholder="Username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				className="w-full input input-bordered"
				required
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className="w-full input input-bordered"
				required
			/>

			<button type="submit" className="w-full btn btn-primary">
				{isLoading ? <Loader className="size-5 animate-spin" /> : 'Login'}
			</button>
		</form>
	);
};

export default LoginForm;
