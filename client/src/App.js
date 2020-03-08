import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import MainPage from "./components/MainPage";

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/' exact>
					<LoginForm />
				</Route>
				<Route path='/login'>
					<LoginForm />
				</Route>
				<Route path='/signup'>
					<SignUpForm />
				</Route>
				<Route path='/home'>
					<MainPage />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
