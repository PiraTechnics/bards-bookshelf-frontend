const blogApiUrl = `${import.meta.env.VITE_API_URL}/blog`;

export const getAllBlogPosts = async () => {
	const res = await fetch(`${blogApiUrl}/posts`, {
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
