const blogApiUrl = `${import.meta.env.VITE_API_URL}/blog`;

export const getBlogPosts = async (limit: number) => {
	//limit is max number of results to fetch, 0 = no limit
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
