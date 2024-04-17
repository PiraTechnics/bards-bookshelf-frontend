import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = () => {
	const [user, setUser] = useState(localStorage.getItem("username"));
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.clear();
		setUser(null);
		navigate("/");
	};

	return (
		<div className="flex gap-4">
			{user ? (
				<>
					<div className="grid grid-cols-1 grid-rows-2 text-sm text-end">
						<p>
							Welcome, <span className="font-semibold">{user}</span>
						</p>
						<button className="hover:underline" onClick={handleLogout}>
							Log Out <span aria-hidden="true">&rarr;</span>
						</button>
					</div>
					<span className="inline-block h-9 w-9 overflow-hidden rounded-full bg-gray-100">
						<svg
							className="h-full w-full text-gray-300"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
						</svg>
					</span>
				</>
			) : (
				<a className="hover:underline" href="/login">
					Log In <span aria-hidden="true">&rarr;</span>
				</a>
			)}
		</div>
	);
};

export default UserWidget;
