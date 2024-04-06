export const getAllBlogPosts = async () => {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/`, {
		mode: "cors",
	});

	if (!res.ok) {
		throw new Error(`HTTP error: Status ${res.status}`);
	}

	return res.json();
};

export const getBlogPost = async (postId: string) => {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
		mode: "cors",
	});

	if (!res.ok) {
		throw new Error(`HTTP error: Status ${res.status}`);
	}

	return res.json();
};
