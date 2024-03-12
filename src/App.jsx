import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home></Home>}></Route>
				<Route path="/hotels" element={<List></List>}></Route>
				<Route path="/hotels/:id" element={<Hotel></Hotel>}></Route>
				<Route path="/login" element={<Login></Login>}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
