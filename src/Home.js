import React, { useState, useEffect, useRef } from "react";
import Carousel from "react-bootstrap/Carousel";
import $ from "jquery";
import { useSwipeable } from "react-swipeable";
//import Toast from "react-bootstrap/Toast";
import { useHistory } from "react-router-dom";

var rightSwipes = 0;
function ShowCarousal(props) {
	var nextIndex = useRef(props.activeIndex);
	var currentIndex = useRef(props.activeIndex);
	const [images, setImages] = useState(props.images);

	const listItems = images.map((image, number) => (
		<Carousel.Item key={number}>
			<img className="d-block w-100" src={image} alt="slide" />
		</Carousel.Item>
	));
	return (
		<Carousel
			controls={true}
			indicators={false}
			touch={true}
			interval={null}
			activeIndex={currentIndex.current}
			onSlid={(eventKey, direction) => {
				//alert(1);
				//console.log(currentIndex.current);
				if (direction === "right") {
					rightSwipes++;
				}
				props.removeItem(currentIndex.current, nextIndex.current);
				//setImages(images_);
			}}
			onSelect={(eventKey, event) => {
				//console.log(eventKey + " netx index");
				nextIndex.current = eventKey;
			}}
		>
			{listItems}
		</Carousel>
	);
}
const DivCarousal = (props) => {
	const config = {
		delta: 10, // min distance(px) before a swipe starts
		preventDefaultTouchmoveEvent: true, // preventDefault on touchmove, *See Details*
		trackTouch: true, // track touch input
		trackMouse: true, // track mouse input
		rotationAngle: 0, // set a rotation angle
	};
	const handlers = useSwipeable({
		onSwiped: (eventData) => {
			//alert(eventData.dir);
			if (eventData.dir === "Left" || eventData.dir === "Right") {
				$(eventData.event.target)
					.parent()
					.slideUp(100, function () {
						if ($(this).siblings().length == 0) {
							$(this).remove();
							props.finished();
						} else {
							$(this).next().removeClass("d-none").addClass("d-block");
							$(this).remove();
						}
					});

				if (eventData.dir === "Right") {
					rightSwipes++;
				}
			}
		},
		...config,
	});
	return (
		<div {...handlers} className={props.class} key={props.index}>
			<img className="w-100 h-100" src={props.image} alt="slide" />
		</div>
	);
};

export default function Home() {
	const [listItems, setListItems] = useState([]);
	let history = useHistory();
	const fetchData = async () => {
		const result = await fetch(`./images.json`);
		const data = await result.json();
		setListItems(() => {
			return [...data];
		});
	};

	useEffect(() => {
		fetchData();
	}, []);

	const carousal = listItems.map((number, index) => (
		<DivCarousal
			image={number}
			key={index}
			class={index == 0 ? "d-block w-100 h-100" : "d-none w-100 h-100"}
			finished={() => {
				if (rightSwipes >= 5) {
					//alert("go to next page");
					history.push("/listing");
				} else {
					window.location = window.location.href;
				}
				rightSwipes = 0;
			}}
		/>
	));
	return <div className="Home">{listItems.length && carousal}</div>;
}
