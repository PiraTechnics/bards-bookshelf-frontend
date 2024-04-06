//import { useState } from "react";
//import reactLogo from "./assets/react.svg";
//import viteLogo from "/vite.svg";
import "./App.css";
import Blogpost from "./components/Blogpost";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
	//const [count, setCount] = useState(0);

	return (
		<BrowserRouter>
			<Routes>
				<Route
					index
					element={<Blogpost postId={"66107398421aacad7e441db8"} />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
