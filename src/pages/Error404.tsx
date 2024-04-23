import Layout from "../components/Layout";
import Error from "../components/Error";

const Error404 = () => {
	return (
		<Layout
			content={
				<div className="mx-auto max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-8 lg:mx-0 lg:max-w-screen-2xl">
					{<Error />}
				</div>
			}
		></Layout>
	);
};

export default Error404;
