"use strict";

let mainColor = '#2C3A47';
let bgColor = '#CAD3C8';

function setup() {
	createCanvas(windowWidth, windowHeight);
	noLoop(); //will only call draw() one time.
}

function mousePressed() {
	redraw();
}

function mouseDragged() {
	background(bgColor);
	drawOnGridWithMouseResizing(drawQuadrants, 0.35, 0.1);
}

function draw() {
	background(bgColor);
	drawOnGrid(drawQuadrants, 0.35, 0.1);
}

function drawQuadrants() {
	push();
	//scale will have result at max 0.35 * min(width, height)
	scale(0.5);
	//these draw to diameter of 0.7 * min(width, height)
	drawArcs(0, PI / 2, 20);
	drawArcs(PI / 2, PI, 20);
	drawArcs(PI, PI * 1.5, 20);
	drawArcs(PI * 1.5, PI * 2, 20);
	pop();
}

const snapTo = (v, grid) => grid * floor(v / grid);

function drawArcs(angleStart, angleStop, ringSize) {
	let r = random();
	if (r > 0.9) {
		stroke(bgColor);
		fill(mainColor);
	} else if (r > 0.4) {
		noStroke();
		fill(mainColor);
	} else {
		stroke(mainColor);
		fill(bgColor);
	}


	const sizes = [0.7, 0.5, 0.3].map(s => snapTo(s * min(width, height), 20));

	let size = random(sizes)

	let c = {
		x: 0,
		y: 0
	}
	while (size > 100) {
		let r = size
		arc(c.x, c.y, r, r, angleStart, angleStop);
		size = size - ringSize;
	}

}

function keyPressed() {
	if (key === "d") {
		dbg.isDebugging = !dbg.isDebugging;
	}
	if (key === "s") {
		save("grid-demo.png");
	}
}