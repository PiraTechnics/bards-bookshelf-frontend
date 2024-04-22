const authUrl = `${import.meta.env.VITE_API_URL}/auth`;

export const registerUser = async (newUserData: {
	firstname: string;
	lastname: string;
	username: string;
	password: string;
	passwordConfirmation: string;
	authorCode: string;
}) => {
	const res = await fetch(`${authUrl}/register`, {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
		},
		redirect: "follow",
		referrerPolicy: "no-referrer",
		body: JSON.stringify(newUserData),
	});

	return res.json();
};

export const loginUser = async (loginData: {
	username: string;
	password: string;
}) => {
	const res = await fetch(`${authUrl}/login`, {
		method: "POST",
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
		},
		redirect: "follow",
		referrerPolicy: "no-referrer",
		body: JSON.stringify(loginData),
	});

	return res.json();
};

export const isAdmin = async () => {
	const res = await fetch(`${authUrl}/authorized`, {
		mode: "cors",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
		redirect: "follow",
		referrerPolicy: "no-referrer",
	});

	if (!res.ok) {
		console.log(res.json());
		throw new Error(`HTTP error: Status ${res.status}`);
	}

	return res.json();
};
