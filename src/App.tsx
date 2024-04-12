import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import Blogpost from "./pages/Blogpost";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<HomePage />} />
				<Route path="/blog/:slug" element={<Blogpost />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
