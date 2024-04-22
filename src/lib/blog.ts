const blogApiUrl = `${import.meta.env.VITE_API_URL}/blog`;

export const getBlogPosts = async (limit: number) => {
	//limit is max number of results to fetch, 0 = no limit
	//default order is descending (most recent first), put 'order=asc' to change
	const res = await fetch(`${blogApiUrl}/posts?limit=${limit}`, {
		mode: "cors",
	});

	if (!res.ok) {
		throw new Error(`HTTP error: Status ${res.status}`);
	}

	return res.json();
};

export const getPublishedUnpublishedBlogPosts = async (limit: number) => {
	const res = await fetch(`${blogApiUrl}/allposts?limit=${limit}`, {
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});

	if (!res.ok) {
		throw new Error(`HTTP error: Status ${res.status}`);
	}

	return res.json();
};

export const getBlogPost = async (postSlug: string) => {
	const res = await fetch(`${blogApiUrl}/posts/${postSlug}`, {
		mode: "cors",
	});

	if (!res.ok) {
		throw new Error(`HTTP error: Status ${res.status}`);
	}

	return res.json();
};

export const createNewBlogPost = async (blogPostData: {
	title: string;
	content: string;
	published: boolean;
}) => {
	const res = await fetch(`${blogApiUrl}/posts/`, {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		redirect: "follow",
		referrerPolicy: "no-referrer",
		body: JSON.stringify(blogPostData),
	});

	return res.json();
};

export const AddCommentToBlogPost = async (AddCommentProps: {
	parentPost: string;
	content: string;
	commentor: string;
}) => {
	const comment = {
		content: AddCommentProps.content,
		commentor: AddCommentProps.commentor,
	};

	const res = await fetch(
		`${blogApiUrl}/posts/${AddCommentProps.parentPost}/comment`,
		{
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			redirect: "follow",
			referrerPolicy: "no-referrer",
			body: JSON.stringify(comment),
		}
	);

	return res.json();
};

export const UpdateBlogPost = async (blogPostData: {
	title: string;
	content: string;
	published: boolean;
	slug: string;
}) => {
	//Note should probably re-sanitize the content before updating

	const updatedPost = {
		title: blogPostData.title,
		content: blogPostData.content,
		published: blogPostData.published,
	};

	const res = await fetch(`${blogApiUrl}/posts/${blogPostData.slug}`, {
		method: "PUT",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		redirect: "follow",
		referrerPolicy: "no-referrer",
		body: JSON.stringify(updatedPost),
	});

	return res.json();
};
