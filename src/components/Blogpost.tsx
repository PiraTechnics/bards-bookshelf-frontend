import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { getBlogPost } from "../lib/api";

const Blogpost = ({ postId }: BlogpostProps) => {
	const [loading, setLoading] = useState(false);
	const [post, setPost] = useState<BlogpostData>();

	useEffect(() => {
		const fetchBlogpost = async () => {
			setLoading(true);
			const data = await getBlogPost(postId);

			setPost(data);
			setLoading(false);
		};

		fetchBlogpost();
	}, [postId]);

	return (
		!loading &&
		post && (
			<div className="flex flex-col gap-4">
				<h1>{post.title}</h1>
				<p>{post.body}</p>
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
