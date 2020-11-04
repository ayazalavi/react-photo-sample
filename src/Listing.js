import Card from "react-bootstrap/Card";
import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

export default function Listing() {
	const [listing, setListing] = useState({});
	let history = useHistory();
	const fetchData = async () => {
		const result = await fetch(`./listing.json`);
		var data = await result.json();
		const images = await fetch(`./images.json`);
		const data2 = await images.json();
		data.image = data2[0];
		setListing(data);
		//console.log(data);
	};
	const sendCompletion = async () => {
		const result = await fetch(`./listing.json`);
		var data = await result.json();
		alert("Request received");
		//console.log(data);
	};
	useEffect(() => {
		fetchData();
	}, []);
	return (
		<Card style={{ width: "100%" }}>
			<Card.Img
				variant="top"
				style={{ height: "250px" }}
				src={listing.image != null ? listing.image : ""}
			/>
			<Card.Body>
				<Card.Title>Rent</Card.Title>
				<Card.Text>{listing["Rent"]}</Card.Text>
				<Card.Title>Additional costs</Card.Title>
				<Card.Text>{listing["Additional costs"]}</Card.Text>
				<Card.Title>Address</Card.Title>
				<Card.Text>{listing["Address"]}</Card.Text>
				<Card.Title>Number of rooms</Card.Title>
				<Card.Text>{listing["Number of rooms"]}</Card.Text>
				<Card.Title>Number of flatmates</Card.Title>
				<Card.Text>{listing["Number of flatmates"]}</Card.Text>
				<Card.Title>Email and/or the phone number of the landlord</Card.Title>
				<Card.Text>
					{listing["Email and/or the phone number of the landlord"]}
				</Card.Text>
				<Card.Footer>
					<large className="text-muted">
						Would you like to send an inquiry?
					</large>
					<Button
						variant="primary"
						style={{ width: "100%", margin: "10px 0px" }}
						onClick={sendCompletion}
					>
						Yes
					</Button>
					<Button
						variant="secondary"
						style={{ width: "100%" }}
						onClick={() => {
							history.push("/home");
						}}
					>
						No
					</Button>
				</Card.Footer>
			</Card.Body>
		</Card>
	);
}
