import UserWidget from "./UserWidget";

const Navbar = () => {
	return (
		<nav className="flex px-4 py-1 items-center justify-between h-full mx-auto border-b">
			<div className="pb-2 flex gap-8 lg:gap-12 *:text-xl *:font-semibold *:rounded-md">
				<a className="hover:underline" href="#">
					Home
				</a>
				<a className="hover:underline" href="#">
					Posts
				</a>
			</div>
			<UserWidget />
		</nav>
	);
};

export default Navbar;
