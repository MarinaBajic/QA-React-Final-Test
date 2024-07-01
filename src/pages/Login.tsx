import { ChangeEvent, useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState<{
		username?: string;
		password?: string;
	}>({});
	const { login } = useAuth();
	const navigate = useNavigate();

	const validate = () => {
		const newErrors: { username?: string; password?: string } = {};

		if (!username) {
			newErrors.username = 'Username is required';
		}

		if (!password) {
			newErrors.password = 'Password is required';
		} else if (password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters long';
		}

		return newErrors;
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const validationErrors = validate();
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
		} else {
			try {
				await login(username, password);
				navigate('/');
			} catch (error) {
				console.error('Login failed:', error);
				setErrors({
					username: 'Invalid username or password',
					password: 'Invalid username or password',
				});
			}
		}
	};

	return (
		<main className="py-12">
			<h1 className="text-4xl mb-16">Log in</h1>
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-96 flex flex-col gap-10 mx-auto"
			>
				<div className="flex flex-col gap-3 items-start">
					<label htmlFor="username">Username</label>
					<input
						className="w-full p-2 border-2 rounded-md"
						type="text"
						name="username"
						value={username}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setUsername(e.target.value)
						}
					/>
					{errors.username && (
						<span className="text-red-500">{errors.username}</span>
					)}
				</div>
				<div className="flex flex-col gap-3 items-start">
					<label htmlFor="password">Password</label>
					<input
						className="w-full p-2 border-2 rounded-md"
						type="password"
						name="password"
						value={password}
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setPassword(e.target.value)
						}
					/>
					{errors.password && (
						<span className="text-red-500">{errors.password}</span>
					)}
				</div>
				<button type="submit">Log in</button>
			</form>
		</main>
	);
}

export default Login;
