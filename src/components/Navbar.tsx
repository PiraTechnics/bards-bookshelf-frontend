const Navbar = () => {
	return (
		<header className="sticky top-0 z-10 w-full max-w-screen-2xl bg-cws-secondary  lg:rounded-b-lg h-fit shadow-xl text-black mx-auto rounded-b-md">
			<nav className="flex px-4 items-center justify-between h-full mx-auto">
				<div className="pb-2 flex gap-8 lg:gap-12 *:text-xl *:font-semibold *:rounded-md">
					<a className="hover:underline" href="#">
						Home
					</a>
					<a className="hover:underline" href="#">
						Posts
					</a>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
