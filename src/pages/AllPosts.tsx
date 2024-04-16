import { useEffect, useState } from "react";
import { getBlogPosts } from "../lib/blog";
import Layout from "../components/Layout";
import { DateTime } from "luxon";

const AllPosts = () => {
	const [loading, setLoading] = useState(false);
	const [posts, setPosts] = useState<BlogpostData[]>([]);

	useEffect(() => {
		const fetchBlogPosts = async () => {
			setLoading(true);
			const data = await getBlogPosts(0); //retreive all posts (0 = no limit)

			setPosts(data);
			setLoading(false);
		};

		fetchBlogPosts();
	}, []);

	return (
		<Layout
			content={
				<div className="mx-auto max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-8 lg:mx-0 lg:max-w-screen-2xl">
					{!loading &&
						posts.map((post) => (
							<article
								key={post._id}
								className="mx-auto border-2 rounded-xl p-6 mb-8 lg:max-w-screen-lg"
							>
								<h2>{post.title}</h2>
								<p>{post.content}</p>
								<p className="text-slate-600 text-sm">
									{DateTime.fromJSDate(
										new Date(post.datePosted)
									).toLocaleString(DateTime.DATETIME_MED)}
								</p>
							</article>
						))}
				</div>
			}
		></Layout>
	);
};

export default AllPosts;
