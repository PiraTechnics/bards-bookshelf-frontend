import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { getBlogPost } from "../lib/blog";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Error from "../components/Error";

const Blogpost = () => {
	const { slug } = useParams();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [post, setPost] = useState<BlogpostData>();

	useEffect(() => {
		//console.log(`slug for lookup is: ${slug}`);
		const fetchBlogpost = async () => {
			setLoading(true);
			const data = await getBlogPost(slug || "").catch((error) =>
				setError(error)
			);

			setPost(data);
			setLoading(false);
			//console.log(data);
		};

		fetchBlogpost();
	}, [slug]);

	const blogpostData = post && (
		<article className="mx-auto border-2 rounded-xl p-6 mb-8 lg:max-w-screen-lg">
			<div className="border-b pb-2 mb-8">
				<h2>{post.title}</h2>
			</div>
			<div dangerouslySetInnerHTML={{ __html: post.content }}></div>
			<div className="text-slate-600 text-sm mt-4 pt-2 border-t flex flex-col">
				<p className="text-slate-700">{post.author.username}</p>
				<p>
					{DateTime.fromJSDate(new Date(post.datePosted)).toLocaleString(
						DateTime.DATETIME_MED
					)}
				</p>
			</div>
		</article>
	);

	const postContent = () => {
		if (error) {
			return <Error />;
		}
		if (loading) {
			return <p>Loading...</p>;
		}
		return blogpostData;
	};

	return (
		<Layout
			content={
				<div className="mx-auto max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-8 lg:mx-0 lg:max-w-screen-2xl">
					{postContent()}
				</div>
			}
		></Layout>
	);
};

export default Blogpost;
