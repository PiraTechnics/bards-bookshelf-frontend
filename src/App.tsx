import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import Blogpost from "./pages/Blogpost";
import LoginForm from "./pages/Login";
import RegisterForm from "./pages/Register";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<HomePage />} />
				<Route path="/login" element={<LoginForm />}></Route>
				<Route path="/register" element={<RegisterForm />}></Route>
				<Route path="/blog/:slug" element={<Blogpost />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
