import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";

// Pages
import Home from "./pages/home";
import Single from "./pages/single";
import Multi from "./pages/multi";

import ContextState from "./context/ContextState";
import Rooms from "./pages/rooms";

function App() {
	return (
		<div className="App">
      <div id="rectangle1"></div>
      <div id="rectangle2"></div>
			<ContextState>
				<nav>
					<ul className="horizontal gray">
						<li>
							<Link className="nav-link" to='/' >Home</Link>
						</li>
					</ul>
				</nav>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path='/single' element={<Single />} />
					<Route path='/multi' element={<Multi />} />
					<Route path='/rooms' element={<Rooms />} />
				</Routes>
			</ContextState>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Comic+Neue"></link>
		</div>
	);
}

export default App;
