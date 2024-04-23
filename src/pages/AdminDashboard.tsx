import { useEffect, useState } from "react";
//import Error from "../components/Error";
import { isAdmin } from "../lib/auth";
import { UpdateBlogPost, getPublishedUnpublishedBlogPosts } from "../lib/blog";
import AdminLayout from "../components/AdminLayout";
import { DateTime } from "luxon";

const AdminDashboard = () => {
	const [loading, setLoading] = useState(false);
	const [posts, setPosts] = useState<BlogpostData[]>([]);
	//const [userAuthorized, setUserAuthorized] = useState(false);
	//const currentUser = localStorage.getItem("username") || "";

	const handlePublishUnpublish = (data: BlogpostData) => {
		console.log(data);

		data.published = data.published ? false : true; //publish if was draft, and vice-verse

		const result = UpdateBlogPost(data);
		//console.log(result);

		window.location.reload(); //reload page after update
	};

	useEffect(() => {
		const fetchAuthorizationAndPosts = async () => {
			setLoading(true);
			const result = await isAdmin();

			if (result.status) {
				//Error state
				console.log(result.message);
			} else {
				//Success state
				//setUserAuthorized(result);
				//console.log(`Logged in as: ${currentUser}, Admin Status: ${result}`);
				const data = await getPublishedUnpublishedBlogPosts(0); //retreive all posts (0 = no limit)
				setPosts(data);
			}

			setLoading(false);
		};

		fetchAuthorizationAndPosts();
	}, []);

	const loadingSkeleton = <div>Loading...</div>;

	if (loading) {
		return loadingSkeleton;
	}

	return (
		<AdminLayout
			content={
				<div className="inline-block min-w-full py-2 mt-4 align-middle sm:px-6 lg:px-8">
					<h5 className="font-semibold">Your Posts</h5>
					<table className=" my-2 min-w-full divide-y divide-gray-300">
						<thead>
							<tr>
								<th
									scope="col"
									className="px-3 py-3.5 pl-4 pr-3 text-sm text-left font-medium text-gray-900 sm:pl-6 lg:pl-8"
								>
									Title
								</th>
								<th
									scope="col"
									className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
								>
									Status
								</th>
								<th
									scope="col"
									className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
								>
									Last Updated
								</th>
								<th
									scope="col"
									className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
								>
									Comments
								</th>
								<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
									<span className="sr-only">Edit</span>
								</th>
								<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
									<span className="sr-only">Publish</span>
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200 bg-white">
							{posts.map((post) => (
								<tr key={post._id}>
									<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
										<a
											className="underline text-blue-400"
											href={`/blog/${post.slug}`}
										>
											{post.title}
										</a>
									</td>
									<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
										{post.published ? (
											<span className="inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500 ring-1 ring-inset ring-green-500/20">
												Published
											</span>
										) : (
											<span className="inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400/20">
												Draft
											</span>
										)}
									</td>
									<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
										{DateTime.fromJSDate(
											new Date(post.dateUpdated)
										).toLocaleString(DateTime.DATETIME_SHORT)}
									</td>
									<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
										{post.comments.length}
									</td>
									<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
										<a
											href={`/blog/${post.slug}/edit`}
											className="text-indigo-600 hover:text-indigo-900"
										>
											Edit
										</a>
									</td>
									<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
										<button
											type="button"
											onClick={() => handlePublishUnpublish(post)}
											className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 focus:bg-slate-600"
										>
											{post.published ? "Save as draft" : "Publish"}
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			}
		/>
	);
};

export default AdminDashboard;
