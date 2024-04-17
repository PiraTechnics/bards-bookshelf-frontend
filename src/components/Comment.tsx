import { DateTime } from "luxon";

const Comment = ({ comment }: { comment: CommentProps }) => {
	return (
		<article className="border-2 rounded-xl px-4 py-2 mb-6 lg:max-w-screen-sm">
			<div className="border-b pb-4 mb-2">
				<p>{comment.content}</p>
			</div>
			<div className="text-slate-600 text-sm flex gap-1">
				<p className="text-slate-800">{comment.commentor}</p>
				<span>-</span>
				<p>
					{DateTime.fromJSDate(new Date(comment.datePosted)).toLocaleString(
						DateTime.DATETIME_MED
					)}
				</p>
			</div>
		</article>
	);
};

export default Comment;
