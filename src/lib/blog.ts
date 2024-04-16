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
	publish: boolean;
}) => {
	//const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
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