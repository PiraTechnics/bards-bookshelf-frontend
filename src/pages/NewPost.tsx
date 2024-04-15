import { useState } from "react";
import Layout from "../components/Layout";
import RichTextEditor from "../components/RichTextEditor";
import { Switch } from "@headlessui/react";

const NewPost = () => {
	const [formData, setFormData] = useState({
		title: "",
		content: "",
	});
	const [publish, setPublish] = useState(false);

	const handleChange = (e: { target: { name: string; value: string } }) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	function classNames(...classes: string[]) {
		return classes.filter(Boolean).join(" ");
	}

	//Note: How do we handle form submission with Quill? IE -- how do we get the contents of the text editor

	return (
		<Layout
			content={
				<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8 border-t mt-4 border-gray-200">
					<h3>New Post</h3>
					<div className="mt-4 p-4 border-2 border-gray-200 rounded-md flex flex-col">
						<div className="flex flex-col gap-2 pb-4">
							<label htmlFor="title" className="block leading-6 text-gray-900">
								Post Title
							</label>
							<input
								id="title"
								name="title"
								type="text"
								value={formData.title}
								onChange={handleChange}
								required
								className="block w-full p-1.5 border border-slate-300 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
							/>
						</div>
						<div className="flex flex-col gap-2 pb-4">
							<p>Post Body</p>
							<RichTextEditor />
						</div>
						<div className="grid grid-cols-2 gap-8">
							<Switch.Group as="div" className="flex items-center">
								<Switch
									checked={publish}
									onChange={setPublish}
									className={classNames(
										publish ? "bg-indigo-600" : "bg-gray-200",
										"relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none "
									)}
								>
									<span
										aria-hidden="true"
										className={classNames(
											publish ? "translate-x-5" : "translate-x-0",
											"pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out"
										)}
									/>
								</Switch>
								<Switch.Label as="span" className="ml-3 text-sm">
									<span className="font-medium text-gray-900">Publish</span>
								</Switch.Label>
							</Switch.Group>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Save
							</button>
						</div>
					</div>
				</div>
			}
		></Layout>
	);
};

export default NewPost;
