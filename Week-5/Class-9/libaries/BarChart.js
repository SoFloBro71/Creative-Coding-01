class BarChart{
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
        this.space = 20;
        this.header = "Afforestation Area by County 2007-2021";
        this.unit = "Unit (Hectares)";
    }

    draw(){
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
        let colour = ['#576490','#7796CB', '#A3BCF9', '#D1D2F9']

        push();
        translate(this.margin,0);
        for(let x=0; x<numBars; x++){
            let value = int(this.data.rows[x].obj.Total);
            // LOOPS COLOURS
            let numColour = x % 4;
            fill(color(colour[numColour]));
            rect(x*barSpace,0,barWidth,this.scaleMeBabes(-value),4,4,4,4);
        }
        pop();
    }

    hLine(){
        // THIS IS THE HORIZONTAL LINE
        stroke(250);
        line(0 ,0, this.width,0);
        push();
        translate(this.margin,0);
    }


    vLine(){
        // THIS IS THE VERTICAL LINE
        stroke(250);
        line(0, 0, 0, -this.height);
        // THIS IS THE LINE TICKS
        for(let y = 1; y < this.ticks+1; y++){
            let tGap = this.height/this.ticks;
            stroke(250);
            line(0,-tGap*y,-10,-tGap*y);

            let maxGap = (this.maxValue/this.ticks).toFixed();

            // TEXT
            noStroke();
            fill(250);
            textSize(14);
            textAlign(RIGHT,CENTER)
            // PLACES TEXT ALONG THE TICKS 
            text(y*maxGap,-15,-tGap*y);

            // TITLE
            push();
            textStyle(BOLD);
            textFont("Courier Prime");
            text(this.header, 300,-this.height-this.space)
            pop();
            // UNIT 
            text(this.unit, -50,-160)

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
            translate(x*barSpace + (barWidth/2), 10);
            rotate(45);
            fill(250);
            noStroke();
            textSize(14);
            textAlign(LEFT,TOP)
            // CENTERS THE TEXT WITH THE BARS
            text(value,0,0);
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