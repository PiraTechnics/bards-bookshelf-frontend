import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { getBlogPost } from "../lib/api";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

const Blogpost = () => {
	const { slug } = useParams();
	const [loading, setLoading] = useState(false);
	const [post, setPost] = useState<BlogpostData>();

	useEffect(() => {
		//console.log(`slug for lookup is: ${slug}`);
		const fetchBlogpost = async () => {
			setLoading(true);
			const data = await getBlogPost(slug || "");

			setPost(data);
			setLoading(false);
			//console.log(data);
		};

		fetchBlogpost();
	}, [slug]);

	const blogpostData = post && (
		<article className="mx-auto border-2 rounded-xl p-6 mb-8 lg:max-w-screen-lg">
			<h2>{post.title}</h2>
			<p>{post.content}</p>
			<p className="text-slate-600 text-sm">
				{DateTime.fromJSDate(new Date(post.datePosted)).toLocaleString(
					DateTime.DATETIME_MED
				)}
			</p>
		</article>
	);

	return (
		<Layout
			content={
				<div className="mx-auto max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-8 lg:mx-0 lg:max-w-screen-2xl">
					{loading ? <p>Loading...</p> : blogpostData}
				</div>
			}
		></Layout>
	);
};

export default Blogpost;
