//usage:
//turn it on
//dbg.isDebugging = true;
//write a debug message
//dbg.debugText(msg, x, y, shouldDrawBackground)
let dbg = (()=> {
	let isDebugging = false;

	const debugObjRoundingValues = (obj, x, y, shouldDrawBackground = false) => debugText(stringifyRounding(obj), x, y, shouldDrawBackground);
	
	function debugText(msg, x, y, shouldDrawBackground = false) {
		if (shouldDrawBackground) {
			fill('black');
			rectMode(CORNER);
			rect(0, y - 20, width, 30);
		}
		fill('white');
		stroke('black');
		text(msg, x, y);
	}

	function stringifyRounding(obj) {
		const newObj = {};
		const suitable = (v) => typeof v === "number" && !isNaN(v) && !Number.isInteger(v);
		for (let [k, v] of Object.entries(obj)) {
			newObj[k] = suitable(v) ? v.toFixed(3) : v;
		}
		return JSON.stringify(newObj);
	}

	return {
		debugText,
		debugObjRoundingValues, 
		isDebugging
	};
})()