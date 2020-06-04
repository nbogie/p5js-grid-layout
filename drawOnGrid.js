
//Draw shapes on a grid, automatically adjusting grid layout to centre and maximise space
//parameters:
//  shapeFn: callback (takes no params) to draw a shape at 0, 0, with a size as promised by originalSizeAsScreenFraction
//  paddingAsShapeFraction: desired distance BETWEEN TWO instances, as fraction of shape's size.
//                                This is NOT the padding each ONE receives on ONE edge, but DOUBLE that.
//  originalSizeAsScreenFraction: Fraction of the smaller canvas dimension which the shape will occupy
//                                if left unscaled.
function drawOnGrid(shapeFn, originalSizeAsScreenFraction, paddingAsShapeFraction) {
	const smallestDim = min(width, height);
	const largestDim = max(width, height);

	const calcPaddedSize = (screenFraction) => screenFraction * (1 + paddingAsShapeFraction) * smallestDim;
	const originalSizeWithPadding = calcPaddedSize(originalSizeAsScreenFraction)
	const numThatFitFully = floor(smallestDim / originalSizeWithPadding);
	const actualSizeWithPadding = smallestDim / numThatFitFully;

	//long axis: distribute any space on the long axis for an exact fit
	const spareSpace = largestDim - numThatFitFully * actualSizeWithPadding;
	const extraPadding = spareSpace / numThatFitFully;

	const yStep = actualSizeWithPadding + (height <= width ? 0 : extraPadding);
	const xStep = actualSizeWithPadding + (height >= width ? 0 : extraPadding);

	if (xStep < 30 || yStep < 30) {
		console.error("too small xStep or yStep", {
			xStep,
			yStep
		});
		return;
	}
	const correctiveScaling = actualSizeWithPadding / originalSizeWithPadding;

	for (let y = yStep / 2; y <= height; y += yStep) {
		for (let x = xStep / 2; x <= width; x += xStep) {
			push();
			translate(x, y);
			if (dbg.isDebugging) {
				rectMode(CENTER);
				square(0, 0, actualSizeWithPadding)
			}
			scale(correctiveScaling);
			shapeFn();
			pop();
		}
	}

	if (dbg.isDebugging) {

		dbg.debugObjRoundingValues({
			xStep,
			yStep,
			width,
			height,
			numThatFitFully
		}, 100, height - 70, true);
		dbg.debugObjRoundingValues({
			originalSizeAsScreenFraction,
			//originalSize,
			originalSizeWithPadding,
			paddingAsShapeFraction,
		}, 100, height - 40, true);
	}

}

//same signature as drawOnGrid
//however, this will allow the mouse to adjust the size and padding of each drawn shape
function drawOnGridWithMouseResizing(drawFn, originalSizeAsScreenFraction, paddingAsShapeFraction) {

	const withScale = (fn, scaling) => {
		push();
		scale(scaling);
		fn();
		pop();
	}

	//padding frac: 
	const pasf = map(mouseX, 0, height, 0.01, 0.6);

	const rescale = map(mouseY, 0, width, 0.2, 2);
	const ossf = originalSizeAsScreenFraction * rescale;

	drawOnGrid(() => withScale(() => drawShape(), rescale),
		ossf,
		pasf);
}

