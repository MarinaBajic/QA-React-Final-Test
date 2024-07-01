import { useEffect, useState } from 'react';
import reactLogo from '../assets/react.svg';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { User } from '../types/User';

function Header() {
	const { logout, isAuthenticated } = useAuth();
	const [user, setUser] = useState<User>();
	const [isDark, setIsDark] = useState<boolean>(() => {
		const savedMode = localStorage.getItem('displayMode');
		return savedMode ? savedMode === 'dark' : true;
	});
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		localStorage.setItem('displayMode', isDark ? 'dark' : 'light');
	}, [isDark]);

	useEffect(() => {
		if (isDark) {
			document.body.classList.remove('light');
			localStorage.setItem('displayMode', 'dark');
		} else {
			document.body.classList.add('light');
			localStorage.setItem('displayMode', 'light');
		}
	}, [isDark]);

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

	const toggleDropdown = () => {
		setIsMenuOpen((wasMenuOpen) => !wasMenuOpen);
	};

	function toggleTheme() {
		console.log('is dark:', isDark);
		setIsDark((wasDark) => !wasDark);
	}

	function handleLogout(e: any) {
		e.preventDefault();
		logout();
	}

	return (
		<header className="backdrop-blur-sm w-full flex justify-between items-center sticky top-0 z-10">
			<Link to="/">
				<img src={reactLogo} className="logo react" alt="React logo" />
			</Link>
			<div className="flex gap-3">
				{isAuthenticated ? (
					<div className="relative">
						<button
							className="flex gap-2 items-center"
							onClick={toggleDropdown}
						>
							<img
								src={user?.image}
								className="w-7"
								alt="User avatar"
								loading="lazy"
							/>
							<span>{`${user?.firstName} ${user?.lastName}`}</span>
						</button>
						{isMenuOpen && (
							<div className="absolute top-12 w-48 rounded-md shadow-lg z-10">
								<Link to="/profile">
									<button className="block w-full text-left px-4 py-2 text-sm">
										My Profile
									</button>
								</Link>
								<form onSubmit={handleLogout}>
									<button
										className="block w-full text-left px-4 py-2 text-sm"
										onClick={handleLogout}
									>
										Log out
									</button>
								</form>
							</div>
						)}
					</div>
				) : (
					<Link to="/login">
						<button className="h-fit ml-auto">Log in</button>
					</Link>
				)}
				<button className="h-fit" onClick={toggleTheme}>
					{isDark ? 'Set to light' : 'Set to dark'}
				</button>
			</div>
		</header>
	);
}

export default Header;
