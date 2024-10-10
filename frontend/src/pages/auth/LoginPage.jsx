import { Link } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage = () => {
	return (
		<div className="flex flex-col justify-center min-h-screen py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<img className="w-auto h-40 mx-auto" src="/logo.svg" alt="LinkedIn" />
				<h2 className="text-3xl font-extrabold text-center text-gray-900 ">
					Sign in to your account
				</h2>
			</div>

			<div className="mt-8 shadow-md sm:mx-auto sm:w-full sm:max-w-md">
				<div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
					<LoginForm />
					<div className="mt-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								{/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
								<div className="w-full border-t border-gray-300"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 text-gray-500 bg-white">
									New to LinkedIn?
								</span>
							</div>
						</div>
						<div className="mt-6">
							<Link
								to="/signup"
								className="flex justify-center w-full px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-transparent rounded-md shadow-sm hover:bg-gray-50"
							>
								Join now
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
