import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import HomePage from "./pages/Home";
import Blogpost from "./pages/Blogpost";
import LoginForm from "./pages/Login";
import RegisterForm from "./pages/Register";
import AllPosts from "./pages/AllPosts";
import NewPost from "./pages/NewPost";
import AdminDashboard from "./pages/AdminDashboard";
import EditPost from "./pages/EditPost";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<HomePage />} />
				<Route
					path="/login"
					element={
						localStorage.getItem("token") ? (
							<Navigate to="/" replace />
						) : (
							<LoginForm />
						)
					}
				></Route>
				<Route
					path="/register"
					element={
						localStorage.getItem("token") ? (
							<Navigate to="/" replace />
						) : (
							<RegisterForm />
						)
					}
				></Route>
				<Route
					path="/admin"
					element={
						// need to be logged in AND an admin --> how do we verify the latter?
						localStorage.getItem("token") ? (
							<AdminDashboard />
						) : (
							<Navigate to="/" replace />
						)
					}
				/>
				<Route path="/blog/" element={<AllPosts />} />
				<Route path="/blog/:slug" element={<Blogpost />} />
				<Route
					path="/blog/new"
					element={
						localStorage.getItem("token") ? (
							<NewPost />
						) : (
							<Navigate to="/blog" replace />
						)
					}
				/>
				<Route
					path="/blog/:slug/edit"
					element={
						localStorage.getItem("token") ? (
							<EditPost />
						) : (
							<Navigate to="/blog" replace />
						)
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
