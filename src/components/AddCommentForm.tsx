import { ChangeEvent, FormEvent, useState } from "react";
import DOMPurify from "dompurify";
import { AddCommentToBlogPost } from "../lib/blog";

interface AddCommentProps {
	postSlug: string;
	setReload: (val: boolean) => void;
}

const AddCommentForm = ({ postSlug, setReload }: AddCommentProps) => {
	const [newComment, setNewComment] = useState("");
	const currentUser = localStorage.getItem("username") || "Anonymous";

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		await AddCommentToBlogPost({
			parentPost: postSlug,
			content: DOMPurify.sanitize(newComment),
			commentor: currentUser,
		});

		setNewComment("");
		setReload(true);
	};

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setNewComment(e.target.value);
	};

	return (
		<div className="p-4 border rounded-md">
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="newComment" className="text-sm">
						Commenting as: <span className="font-semibold">{currentUser}</span>
					</label>
					<textarea
						id="newComment"
						name="newComment"
						rows={4}
						cols={50}
						value={newComment}
						onChange={handleChange}
						className="block w-full rounded-md border-0 p-1.5 my-2 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
					/>
				</div>
				<button
					type="submit"
					className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 max-w-fit"
				>
					Add Comment
				</button>
			</form>
		</div>
	);
};

export default AddCommentForm;
