class SideStackedChart {
	constructor(
		_width,
		_height,
		_XPos,
		_YPos,
		_title,
		_data,
		_valueWidth,
		_xLabels
	) {
		this.width = _width;
		this.height = _height;
		this.XPos = _XPos;
		this.YPos = _YPos;
		this.title = _title;
		this.data = _data;
		this.ticks = 10;
		this.rounding = 10;
		this.margin = 11;
		this.barGap = 5;
		this.valueWidth = _valueWidth;
		this.xLabels = _xLabels;
		this.maxValue = this.getMaxValue();
		this.space = 20;
		this.value = ["Male", "Female"];
		this.valueWidth = _valueWidth;
		this.colour = ["#35CE8D", "#E0D2C3", "#CCFFCB", "#BBD5ED"];
		this.header =
			"Deaths by suicide classified by year of occurrence and sex 2011-2019";
		this.unit = "Amount";
		this.label1 = "Females";
		this.label2 = "Males";
	}

	goDraw() {
        noFill();
        stroke(250);
        push();
        translate(this.XPos, this.YPos);
        this.maxValue = this.getMaxValue();
        // Width and Height
        this.hLine();
        this.vLine();
        // Bars
        this.stackedBars();
        pop();
	}

	stackedBars() {
		let numBars = this.data.getRowCount();
		let gapWidth = this.width - this.margin * 2 - (numBars - 1) * this.barGap;
		let barWidth = gapWidth / numBars;
		let barSpace = barWidth + this.barGap;

		// MAKES THE STACKED CHARTS + CALLS IN COLOURS
		push();
		translate(0, -this.margin);
		for (let x = 0; x < numBars; x++) {
            push();
			for (let y = 0; y < this.value.length; y++) {
                let value = int(this.data.rows[x].obj[this.value[y]]);
				fill(color(this.colour[y % this.colour.length]));
				rect(0, -x * barSpace, this.scaleMeBabes(value), -barWidth);
				translate(this.scaleMeBabes(value), 0);
			}
            translate(-barSpace*x,0);
			pop();
		}
		pop();
	}

	hLine() {
		// THIS IS THE HORIZONTAL LINE
		stroke(250);
		translate(this.margin, 0);
		line(0, 0, this.height, 0);
	}

	vLine() {
		// THIS IS THE VERTICAL LINE
		stroke(250);
		line(0, 0, 0, -this.width);
		// THIS IS THE LINE TICKS
		for (let y = 1; y < this.ticks + 1; y++) {
			let tGap = this.height / this.ticks;
			stroke(250);
			line(tGap * y, 0, tGap * y, 10);
			let maxGap = (this.maxValue / this.ticks).toFixed();

			// TEXT
			noStroke();
			fill(250);
			textSize(14);
			textAlign(CENTER);
			// PLACES TEXT ALONG THE TICKS
			text(y * maxGap, tGap * y, 20);
			// TITLE
            push();
            textStyle(BOLD);
            textFont("Courier Prime");
			text(this.header, 200, -this.height-110);
            pop();
			text(this.unit, 150, 45);

            // LEGEND
            // MALES
            fill('#35CE8D')
            rect(400,-this.height-this.space,15,15)
            fill(250);
            text(this.label2, 450,-310)

            // FEMALES
            fill('#E0D2C3')
            rect(400,-290,15,15)
            fill(250);
            text(this.label1, 460,-280)
		}
	}

	// labels() {
	// 	let numBars = this.data.getRowCount();
	// 	let gapWidth = this.width - this.margin * 2 - (numBars - 1) * this.barGap;
	// 	let barWidth = gapWidth / numBars;
	// 	let barSpace = barWidth + this.barGap;

	// 	// THIS IS THE LINE TICKS + LABLE TEXT
	// 	let labelArray = this.data.getColumn(this.xLabels);
	// 	for (let x = 0; x < labelArray.length; x++) {
	// 		let value = labelArray[x];

	// 		push();
	// 		fill(250);
	// 		noStroke();
	// 		textSize(14);
	// 		textStyle(BOLD);
	// 		textAlign(LEFT, TOP);
	// 		// CENTERS THE TEXT WITH THE BARS
	// 		text(value, -80, -this.height);
	// 		pop();
	// 	}
	// }

	getMaxValue() {
		let max = 0;
		for (let x = 0; x < this.data.getRowCount(); x++) {
			if (int(this.data.rows[x].obj[this.valueWidth]) > max) {
				max = int(this.data.rows[x].obj[this.valueWidth]);
			}
		}
		// HOW TO MAKE VALUES EVEN / DIVISEBLE
		for (let x = max; x < 1000000; x++) {
			// SECOND CONDITION = ROUNDING
			if (x % this.ticks == 0 && x % this.rounding == 0) {
				max = x;
				break;
			}
		}

		return max;
	}

	// HERE IS MY SCALER

	scaleMeBabes(_value) {
		let scaleValue = this.maxValue / this.height;
		return _value / scaleValue;
	}

	// scaleMeBabes(_value){
	//     return map (_value,0,this.maxValue,0,this.height)
	// }
}
