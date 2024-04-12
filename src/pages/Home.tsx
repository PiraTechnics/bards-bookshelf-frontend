import { useEffect, useState } from "react";
import { getBlogPosts } from "../lib/api";
import Layout from "../components/Layout";
import { DateTime } from "luxon";

const baseURI = "/blog";

const capitalize = (input: string) => {
	return input[0].toUpperCase() + input.slice(1);
};

const Home = () => {
	const [loading, setLoading] = useState(false);
	const [recentPosts, setRecentPosts] = useState<BlogpostData[]>([]);

	useEffect(() => {
		const fetchBlogPosts = async () => {
			setLoading(true);
			const data = await getBlogPosts(6); //retreive 6 most recent posts (max)

			setRecentPosts(data);
			setLoading(false);
		};

		fetchBlogPosts();
	}, []);

	const homeContent = (
		<>
			{recentPosts.map((post) => (
				<article
					key={post._id}
					className="flex min-w-lg max-w-xl flex-col items-start justify-between px-4 py-2 border border-slate-400 rounded-xl"
				>
					<div className="flex items-center gap-x-4 text-xs text-gray-600">
						{DateTime.fromJSDate(new Date(post.datePosted)).toLocaleString(
							DateTime.DATETIME_MED
						)}
					</div>
					<div className="group relative">
						<h3 className="mt-3 text-xl font-semibold underline leading-6 text-gray-900 group-hover:text-gray-600">
							<a href={`${baseURI}/${post.slug}`}>
								<span className="absolute inset-0" />
								{post.title}
							</a>
						</h3>
						<p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">
							{post.content.length > 100
								? `${post.content.substring(0, 100)}...`
								: post.content}
						</p>
					</div>
					<div className="relative mt-2 flex items-center gap-x-4">
						<div className="text-sm leading-6">
							<p className="font-semibold text-gray-600">
								{`${capitalize(post.author.firstname)} ${capitalize(
									post.author.lastname
								)}`}
							</p>
						</div>
					</div>
				</article>
			))}
		</>
	);

	return (
		<Layout
			content={
				<div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
					{loading ? <p>Loading...</p> : homeContent}
				</div>
			}
		></Layout>
	);
};

export default Home;
