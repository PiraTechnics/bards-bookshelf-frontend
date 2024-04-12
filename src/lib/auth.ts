const authUrl = `${import.meta.env.VITE_API_URL}/auth`;

export const registerUser = () => {};

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
