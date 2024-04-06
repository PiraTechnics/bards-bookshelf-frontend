import { useState, useEffect } from "react";
import { DateTime } from "luxon";

const apiUrl = "http://localhost:3000/api";

interface BlogpostProps {
	postId: string;
}

type BlogpostData = {
	_id: string;
	title: string;
	body: string;
	author: {
		_id: string;
		username: string;
	};
	published: boolean;
	datePosted: string;
	dateUpdated: string;
};

const Blogpost = ({ postId }: BlogpostProps) => {
	const [loading, setLoading] = useState(false);
	const [post, setPost] = useState<BlogpostData>();

	const fetchBlogpost = async () => {
		setLoading(true);

		const res = await fetch(`${apiUrl}/posts/${postId}`, { mode: "cors" });
		const data: BlogpostData = await res.json();
		console.log(data);

		setPost(data);
		setLoading(false);
	};

	useEffect(() => {
		fetchBlogpost();
	}, []);

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
