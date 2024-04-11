import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { getBlogPost } from "../lib/api";

const Blogpost = ({ postSlug }: BlogpostProps) => {
	const [loading, setLoading] = useState(false);
	const [post, setPost] = useState<BlogpostData>();

	useEffect(() => {
		const fetchBlogpost = async () => {
			setLoading(true);
			const data = await getBlogPost(postSlug);

			setPost(data);
			setLoading(false);
			console.log(data);
		};

		fetchBlogpost();
	}, [postSlug]);

	return (
		!loading &&
		post && (
			<div className="flex flex-col gap-4">
				<h1>{post.title}</h1>
				<p>{post.content}</p>
				<p className="text-slate-700">
					{DateTime.fromJSDate(new Date(post.datePosted)).toLocaleString(
						DateTime.DATETIME_MED
					)}
				</p>
			</div>
		)
	);
};

export default Blogpost;
