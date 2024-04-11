//import { useState } from "react";
//import reactLogo from "./assets/react.svg";
//import viteLogo from "/vite.svg";
//import "./App.css";
import Blogpost from "./components/Blogpost";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/home";

function App() {
	//const [count, setCount] = useState(0);

	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<HomePage />} />
				<Route
					path="/first-post"
					element={<Blogpost postSlug="first-post" />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
