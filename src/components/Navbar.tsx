import { useEffect, useState } from "react";
import { isAdmin } from "../lib/auth";
import UserWidget from "./UserWidget";

const Navbar = () => {
	const [admin, setAdmin] = useState(false);

	useEffect(() => {
		//console.log(`slug for lookup is: ${slug}`);

		const fetchAdminStatus = async () => {
			//if logged in, then check for admin status
			if (localStorage.getItem("username")) {
				const result = await isAdmin();
				if (result.status) {
					//not an admin
				} else {
					setAdmin(result);
				}
			}
		};

		fetchAdminStatus();
	}, [admin]);

	return (
		<nav className="flex px-4 py-1 items-center justify-between h-full mx-auto border-b">
			<div className="pb-2 flex gap-8 lg:gap-12 *:text-xl *:font-semibold *:rounded-md">
				<a className="hover:underline" href="/">
					Home
				</a>
				<a className="hover:underline" href="/blog">
					Posts
				</a>
				{admin && (
					<a className="hover:underline" href="/admin">
						Dashboard
					</a>
				)}
			</div>
			<UserWidget />
		</nav>
	);
};

export default Navbar;
