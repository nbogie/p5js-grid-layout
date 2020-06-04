"use strict";
//palette: https://www.colourlovers.com/palette/629582/Free_Hugs
const palette = ["#FEE1AE", "#B3F5C7", "#280E35", "#EABF56", "#F57637", "#FEE1AE", "#B3F5C7", "#280E35"];

function setup() {
    createCanvas(windowWidth, windowHeight);
    noLoop(); //will only call draw() one time.
}

function draw() {
    drawOnGrid(drawMyShape, 0.2, 0.1);
}

function drawMyShape() {
    const smallerDimension = min(width, height);
    const shapeSize = smallerDimension * 0.2;
    noStroke();
    fill(random(palette));
    circle(0, 0, shapeSize);
    fill(random(palette));
    circle(0, 0, shapeSize * 0.5);
}
