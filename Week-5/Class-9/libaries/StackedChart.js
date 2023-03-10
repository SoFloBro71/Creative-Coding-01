class StackedChart {
    constructor(_width, _height, _XPos, _YPos, _title, _data, _valueWidth, _xLabels) {
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
        this.value = ["Male", "Female"]
        this.valueWidth = _valueWidth;
        this.colour = [ '#A288E3','#CEFDFF','#CCFFCB','#BBD5ED', ];
        this.header = "Deaths by suicide classified by year of occurrence and sex 2011-2019";
        this.unit = "Suicides";
        this.label1 = "Females";
        this.label2 = "Males";
    }

    render() {
        noFill();
        stroke(250);
        push();
        translate(this.XPos, this.YPos);
        this.maxValue = this.getMaxValue();
        // Width and Height
        this.HLine();
        this.VLine();
        // Bars
        this.stackedBars();
        pop();
        }

        stackedBars() {
            let numBars = this.data.getRowCount();
            let gapWidth = this.width - (this.margin*2) - ((numBars - 1)*this.barGap);
            let barWidth = gapWidth/numBars;
            let barSpace = barWidth + this.barGap;

            // MAKES THE STACKED CHARTS + CALLS IN COLOURS
            translate(this.margin, 0);
            for (let x = 0; x < numBars; x++) {
            push()
            translate(x*barSpace, 0)
            push()
            for (let y = 0; y < this.value.length; y++) {
            
            let value = int(this.data.rows[x].obj[this.value[y]]);
            let title = this.data.rows[x].obj.Year;
            // console.log(colour)
            fill(color(this.colour[y % this.colour.length]));
            rect(x/barSpace, 0, barWidth, this.scaleMeBabes(-value));


            translate(0,this.scaleMeBabes(-value))
            }
            pop()
            pop()
            }
        }

        HLine(){
            // THIS IS THE HORIZONTAL LINE
            stroke(250);
            line(0 ,0, this.width,0);
            push();
            translate(this.margin,0);

            // FAILED YEAR TEXT

            // for(let x=0; x<this.value.length; x++){
            //     console.log(this.value.length)
            //     fill(250)
            //     text(this.data.rows[x].obj.Year,50, 40)

            //     push();
            //     translate(0,this.scaleMeBabes(-value))

            // pop()
            // }
        }

        VLine() {
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
            text(this.header, this.width,-this.height-this.space)
            // UNIT
            text(this.unit, -50,-160)

            // LEGEND
            // MALES
            fill('#A288E3')
            rect(500,-this.height-this.space,15,15)
            fill(250);
            text(this.label2, 570,-312)

            // FEMALES
            fill('#CEFDFF')
            rect(500,-290,15,15)
            fill(250);
            text(this.label1, 580,-280)
            }
        }

        scaleMeBabes(_value){
            let scaleValue = this.maxValue/this.height;
            return _value/scaleValue;
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
    }
