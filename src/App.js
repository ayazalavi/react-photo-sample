import logo from "./logo.svg";
import "./App.css";
import Login from "./Login";
import Home from "./Home";
import Listing from "./Listing";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Login />
				</Route>
				<Route path="/home">
					<Home />
				</Route>
				<Route path="/listing">
					<Listing />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
