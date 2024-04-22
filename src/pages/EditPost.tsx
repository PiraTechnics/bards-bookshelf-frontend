import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UpdateBlogPost, getBlogPost } from "../lib/blog";
import { useNavigate } from "react-router-dom";
import LoadingCircle from "../components/LoadingCircle";
import { Switch } from "@headlessui/react";
import Layout from "../components/Layout";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify";

const EditPost = () => {
	const blankForm = {
		title: "",
		content: "",
		slug: "",
		published: false,
	};

	const { slug } = useParams();
	const [post, setPost] = useState(blankForm);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e: { target: { name: string; value: string } }) => {
		const { name, value } = e.target;
		setPost((prevPostData) => ({ ...prevPostData, [name]: value }));
	};

	const handlePublishToggle = () => {
		setPost((prevPostData) => ({
			...prevPostData,
			published: post.published ? false : true,
		}));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const results = await UpdateBlogPost({
			title: post.title,
			content: DOMPurify.sanitize(post.content),
			published: post.published,
			slug: post.slug,
		});

		//console.log(results);

		//we aren't even getting here -- but the update somehow IS going thru...
		if (results.errors || results.error) {
			setSuccess(false);
			setError(results.errors ? "Invalid form data" : results.error);
		} else {
			setSuccess(true);
			//console.log(results);
			setTimeout(() => {
				navigate(`/blog/${post.slug}`); //redirect to blog page
			}, 1000);
		}
	};

	useEffect(() => {
		const fetchBlogpost = async () => {
			const data = await getBlogPost(slug || "").catch((error) => {
				setError(error);
				setLoading(false);
			});

			setPost(data);
			setLoading(false);
		};

		fetchBlogpost();
	}, []);

	function classNames(...classes: string[]) {
		return classes.filter(Boolean).join(" ");
	}

	if (loading) {
		return <div>loading...</div>;
	} else
		return (
			post && (
				<Layout
					content={
						<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8 border-t mt-4 border-gray-200">
							<h3>New Post</h3>
							<form
								onSubmit={handleSubmit}
								className="mt-4 py-8 px-24 border-2 border-gray-200 rounded-md flex flex-col"
							>
								<div className="flex flex-col gap-2 pb-4">
									<label
										htmlFor="title"
										className="block leading-6 text-gray-900"
									>
										Post Title
									</label>
									<input
										id="title"
										name="title"
										type="text"
										value={post.title}
										onChange={handleChange}
										required
										className="block w-full p-1.5 border border-slate-300 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
									/>
								</div>
								<div className="flex flex-col gap-2 pb-4">
									<p>Post Body</p>
									<ReactQuill
										theme="snow"
										value={post.content}
										onChange={(content) =>
											setPost((prevPostData) => ({
												...prevPostData,
												content: content,
											}))
										}
									/>
								</div>
								<div className="grid grid-cols-2 gap-8">
									<Switch.Group as="div" className="flex items-center">
										<Switch
											checked={post.published}
											onChange={handlePublishToggle}
											className={classNames(
												post.published ? "bg-indigo-600" : "bg-gray-200",
												"relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none "
											)}
										>
											<span
												aria-hidden="true"
												className={classNames(
													post.published ? "translate-x-5" : "translate-x-0",
													"pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out"
												)}
											/>
										</Switch>
										<Switch.Label as="span" className="ml-3 text-sm">
											<span className="font-medium text-gray-900">
												Published
											</span>
										</Switch.Label>
									</Switch.Group>
									{success ? (
										<button
											type="submit"
											className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled"
										>
											<LoadingCircle />
											Saving...
										</button>
									) : (
										<button
											type="submit"
											className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
										>
											Save
										</button>
									)}
								</div>
							</form>
							{error && (
								<p className="mt-10 text-center text-sm text-red-500">
									Error: {error}
								</p>
							)}
						</div>
					}
				></Layout>
			)
		);
};

export default EditPost;
