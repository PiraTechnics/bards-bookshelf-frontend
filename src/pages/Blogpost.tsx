import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { RemoveCommentFromPost, getBlogPost } from "../lib/blog";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Error from "../components/Error";
import Comment from "../components/Comment";
import AddCommentForm from "../components/AddCommentForm";
import { isAdmin } from "../lib/auth";

const Blogpost = () => {
	const { slug } = useParams();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [post, setPost] = useState<BlogpostData>();
	const [refresh, setRefresh] = useState(false); //refresh state for new comment submission/removal of comments
	const [admin, setAdmin] = useState(false);

	const handleDeleteComment = (commentId: string, parentSlug: string) => {
		const result = RemoveCommentFromPost({
			postSlug: parentSlug,
			commentId: commentId,
		});

		setRefresh(true);
	};

	useEffect(() => {
		//console.log(`slug for lookup is: ${slug}`);

		const fetchBlogpost = async () => {
			const data = await getBlogPost(slug || "").catch((error) => {
				setError(error);
				setLoading(false);
			});

			//check if post has changed/been updated
			if (post !== data) {
				setPost(data);
			}

			setLoading(false);
			setRefresh(false);
		};

		const fetchAdminStatus = async () => {
			//if logged in, then check for admin status
			if (localStorage.getItem("username")) {
				const result = await isAdmin();
				if (result.status) {
					//not an admin
				} else {
					setAdmin(result);
				}
			}
		};

		fetchBlogpost();
		fetchAdminStatus();
	}, [refresh]);

	const postContent = () => {
		if (loading) {
			return <p>Loading...</p>;
		}
		if (error || !post) {
			return <Error />;
		}

		return (
			<>
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
				<div className="flex flex-col items-start px-2">
					<h5 className="underline mb-4">Comments</h5>
					{post.comments.map((comment) => (
						<div className="flex items-center gap-4" key={comment._id}>
							<Comment comment={comment} />
							{admin && (
								<div>
									<button
										type="button"
										onClick={() => handleDeleteComment(comment._id, post.slug)}
										className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
									>
										Delete
									</button>
								</div>
							)}
						</div>
					))}
					<AddCommentForm postSlug={post.slug} setReload={setRefresh} />
				</div>
			</>
		);
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
