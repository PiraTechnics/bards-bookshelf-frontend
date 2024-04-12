import Navbar from "./Navbar";

const Header = () => {
	return (
		<div className="bg-white px-6 mt-2 lg:px-8">
			<Navbar />
			<div className="mt-8 mx-auto max-w-2xl text-center">
				<h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
					Blog Title
				</h2>
				<p className="mt-6 text-lg leading-8 text-gray-600">
					A Blog with some cool stuff that is summed up in a catchy manner here.
				</p>
			</div>
		</div>
	);
};

export default Header;
