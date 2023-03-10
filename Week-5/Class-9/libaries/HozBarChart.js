class HozBarChart{
    constructor(_width, _height, _XPos, _YPos, _title, _data, _valueWidth, _xLabels){
        this.width = _width;
        this.height = _height;
        this.XPos = _XPos;
        this.YPos = _YPos;
        this.title = _title;
        this.data = _data;
        this.ticks = 10;
        this.rounding = 10;
        this.margin = 10;
        this.barGap = 5;
        this.valueWidth = _valueWidth;
        this.xLabels = _xLabels;
        this.maxValue = this.getMaxValue();
        this.space = 5;
        this.header = "Afforestation Area by County 2007-2021";
        this.unit = "Unit (Hectares)";
    }

    letsDraw(){
        noFill();
        push();
        translate(this.XPos, this.YPos);
        this.hLine();
        this.vLine();
        this.bars();
        this.labels();
        pop(); 
    }

    bars(){
        let numBars = this.data.getRowCount();
        let gapWidth = this.width - (this.margin*2) - ((numBars - 1)*this.barGap);
        let barWidth = gapWidth/numBars;
        let barSpace = barWidth + this.barGap;
        let colour = ['#FF7477','#E69597', '#CEB5B7', '#B5D6D6']

        push();
        translate(this.margin,-385);
        for(let x=0; x<numBars; x++){
            let value = int(this.data.rows[x].obj.Total);
            // LOOPS COLOURS
            let numColour = x % 4;
            fill(color(colour[numColour]));
            rect(0, x*barSpace,this.scaleMeBabes(value),barWidth,5,5,5,5);
        }
        pop();
    }

    hLine(){
        // THIS IS THE HORIZONTAL LINE
        stroke(250);
        translate(this.margin,0);
        line(0 ,0, this.width,0);
        push();
    }


    vLine(){
        // THIS IS THE VERTICAL LINE
        stroke(250);
        line(0, 0, 0, -this.height);
        // THIS IS THE LINE TICKS
        for(let y = 1; y < this.ticks+1; y++){
            let tGap = this.height/this.ticks;
            stroke(250);
            line(tGap*y,0,tGap*y,10);
            let maxGap = (this.maxValue/this.ticks).toFixed();

            // TEXT
            noStroke();
            fill(250);
            textSize(14);
            textAlign(CENTER)
            // PLACES TEXT ALONG THE TICKS
            text(y*maxGap,tGap*y, 20);
            // TITLE
            push();
            textStyle(BOLD);
            textFont("Courier Prime");
            text(this.header, 200,-this.height-this.space)
            pop();

            text(this.unit, 150,50)
        };

    }

    labels(){

        let numBars = this.data.getRowCount();
        let gapWidth = this.width - (this.margin*2) - ((numBars - 1)*this.barGap);
        let barWidth = gapWidth/numBars;
        let barSpace = barWidth + this.barGap;

        // THIS IS THE LINE TICKS + LABLE TEXT
        let labelArray = this.data.getColumn(this.xLabels);
        for(let x=0; x<labelArray.length; x++){
            let value = labelArray[x];
        
            push();
            translate(-10, (x*barSpace + (barWidth*2)));
            fill(250);
            noStroke();
            textSize(14);
            textStyle(BOLD);
            textAlign(LEFT,TOP)
            // CENTERS THE TEXT WITH THE BARS
            text(value,-80,-this.height);
            pop();
        }
    }

    getMaxValue(){
        let max = 0;
        for(let x = 0; x < this.data.getRowCount(); x++){

            if(int(this.data.rows[x].obj[this.valueWidth])>max){
                max=int(this.data.rows[x].obj[this.valueWidth])
            }
        }
        // HOW TO MAKE VALUES EVEN / DIVISEBLE
        for (let x = max; x<1000000; x++){
            // SECOND CONDITION = ROUNDING
            if(x%this.ticks==0 && x%this.rounding==0){
                max = x;
                break
            }
        }

        return max;
    }

    // HERE IS MY SCALER

    scaleMeBabes(_value){
        let scaleValue = this.maxValue/this.height;
        return _value/scaleValue;
    }

    // scaleMeBabes(_value){
    //     return map (_value,0,this.maxValue,0,this.height)
    // }
}