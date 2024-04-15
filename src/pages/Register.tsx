import { FormEvent, useState } from "react";
import { registerUser } from "../lib/auth";
import { useNavigate } from "react-router-dom";
import LoadingCircle from "../components/LoadingCircle";

const Register = () => {
	const blankForm = {
		firstname: "",
		lastname: "",
		username: "",
		password: "",
		passwordConfirmation: "",
		authorCode: "",
	};

	const [formData, setFormData] = useState(blankForm);
	const [errorMessage, setErrorMessage] = useState();
	const navigate = useNavigate();
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const results = await registerUser(formData);

		//Errors can be either an array or error as a single json object
		if (results.errors || results.error) {
			//Error case - Clear Form and put info in error message to conditionally display
			setSuccess(false);
			setFormData(blankForm);
			setErrorMessage(results.errors ? "Invalid form data" : results.error);
		} else {
			setSuccess(true);
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		}
	};

	const handleChange = (e: { target: { name: string; value: string } }) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	return (
		<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Sign up for a new account
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form className="space-y-6" onSubmit={handleSubmit} method="POST">
					<div>
						<label
							htmlFor="firstname"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							First Name
						</label>
						<div className="mt-2">
							<input
								id="firstname"
								name="firstname"
								type="text"
								placeholder="Fred"
								value={formData.firstname}
								onChange={handleChange}
								required
								className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor="lastname"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Last Name
						</label>
						<div className="mt-2">
							<input
								id="lastname"
								name="lastname"
								type="text"
								placeholder="Flintstone"
								value={formData.lastname}
								onChange={handleChange}
								required
								className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor="username"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Email or Username
						</label>
						<div className="mt-2">
							<input
								id="username"
								name="username"
								type="text"
								placeholder="newuser@realmail.org"
								value={formData.username}
								onChange={handleChange}
								required
								className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Choose Password
							</label>
						</div>
						<div className="mt-2">
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								placeholder="Choose a strong password"
								value={formData.password}
								onChange={handleChange}
								required
								className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Confirm Password
							</label>
						</div>
						<div className="mt-2">
							<input
								id="passwordConfirmation"
								name="passwordConfirmation"
								type="password"
								value={formData.passwordConfirmation}
								onChange={handleChange}
								required
								className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="authorCode"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Author Access?
							</label>
						</div>
						<div className="mt-2">
							<input
								type="password"
								name="authorCode"
								id="authorCode"
								placeholder="Enter Access Code"
								value={formData.authorCode}
								onChange={handleChange}
								className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						{" "}
						{success ? (
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled"
							>
								<LoadingCircle />
								Success! Redirecting...
							</button>
						) : (
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Sign up
							</button>
						)}
					</div>
				</form>
				<p className="mt-10 text-center text-sm text-gray-500">
					Already have an account?{" "}
					<a
						href="/login"
						className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
					>
						Sign in here
					</a>
				</p>
				{errorMessage && (
					<p className="mt-10 text-center text-sm text-red-500">
						Regisration Error: {errorMessage}
					</p>
				)}
			</div>
		</div>
	);
};

export default Register;
