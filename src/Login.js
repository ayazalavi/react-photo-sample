import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import $ from "jquery";
import { useHistory } from "react-router-dom";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	let history = useHistory();

	function validateForm() {
		return username.length > 0 && password.length > 0;
	}

	function handleSubmit(event) {
		event.preventDefault();
		if (validateForm()) {
			$.get(
				"./login.json",
				(res) => {
					if (res.username == username && res.password == password) {
						history.push("/home");
					} else {
					}
				},
				"JSON"
			);
		}
	}

	return (
		<div className="Login">
			<form onSubmit={handleSubmit}>
				<FormGroup controlId="email" bssize="large">
					<FormLabel>Username</FormLabel>
					<FormControl
						autoFocus
						type="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</FormGroup>
				<FormGroup controlId="password" bssize="large">
					<FormLabel>Password</FormLabel>
					<FormControl
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
					/>
				</FormGroup>
				<Button block bsSize="large" disabled={!validateForm()} type="submit">
					Login
				</Button>
			</form>
		</div>
	);
}
