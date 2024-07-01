import { useEffect, useState } from 'react';
import { User } from '../types/User';
import { useAuth } from '../context/authContext';

function MyProfile() {
	const { isAuthenticated } = useAuth();
	const [user, setUser] = useState<User>();

	useEffect(() => {
		if (isAuthenticated) {
			fetch('https://dummyjson.com/auth/me', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						'authToken',
					)}`,
				},
			})
				.then((res) => res.json())
				.then(setUser);
		}
	}, [fetch, isAuthenticated]);

	return (
		<main className="py-12">
			<h1 className="text-5xl">{`Welcome ${user?.firstName} ${user?.lastName}`}</h1>
			<div className="w-fit flex flex-col gap-7 mt-12 mx-auto">
				<div className="flex flex-col items-start">
					<span className="uppercase">Username</span>
					<span className="text-2xl font-bold">{user?.username}</span>
				</div>
				<div className="flex flex-col items-start">
					<span className="uppercase">Email</span>
					<span className="text-2xl font-bold">{user?.email}</span>
				</div>
				<div className="flex flex-col items-start">
					<span className="uppercase">First Name</span>
					<span className="text-2xl font-bold">
						{user?.firstName}
					</span>
				</div>
				<div className="flex flex-col items-start">
					<span className="uppercase">Last Name</span>
					<span className="text-2xl font-bold">{user?.lastName}</span>
				</div>
				<div className="flex flex-col items-start">
					<img src={user?.image} className='w-60' alt="User image" />
					<img className="text-2xl font-bold"></img>
				</div>
			</div>
		</main>
	);
}

export default MyProfile;
