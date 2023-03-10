class stackedChart{
    constructor(_height,_width,_posX,_posY,_data){
        this.height = _height;
        this.width = _width;
        this.posX = _posX;
        this.posY = _posY;
        this.data = _data;

        // let maxValue = Math.max(...numFruits);
        // Math.max(...this.data);

        this.maxValue = Math.max(...data.map(object => object.Total));

        this.numBlocks = this.data.getRowCount();
        this.blockGaps = 10;
        this.marginLeft = 20;

        this.blockWidth = (this.width - (this.marginLeft + this.marginLeft) - ((this.numBlocks-1) * this.blockGaps)) / this.numBlocks;


        this.masterGap = 50;
        this.lineTicks = 5;
        this.tLength = 10;
        
        this.tickNum = this.maxValue/this.lineTicks;

        // highest value
        // this.highestValue = int(data.rows[x].obj.Total);

        // for(let x=0; x<this.data.getRowCount(); x++){
        //     console.log(int(data.rows[x].obj.Total) > this.highestValue){
        //         console.log(int(data.rows[x].obj.Total) > this.highestValue)
        //     };
        // }



    }

    render(){
        push();
        translate(this.posX, this.posY);
        noFill();
        stroke(50);
        line(0,0,0,-this.height);
        line(0,0,this.width,0);
        this.stackedLoops();
        this.Axis();
        pop();
    }

    drawHorLine(){
        noFill()
        stroke(50);
        line(0,0,this.width,0);
    }

    drawVerLine(){
        noFill()
        stroke(50);
        line(0,0,-this.height,0);
    }

    scaleMeBabes(_value){
        let scale = this.height / this.maxValue;

        return _value*scale;
    
    }


    stackedLoops(){
       // THIS LOOP DRAWS ALL OUR STACKED BARS
        let colour = ['#FF7477','#E69597', '#CEB5B7', '#B5D6D6']

        for(let x=0; x<this.data.getRowCount(); x++){
            let yMod = 0;

            push();
            translate(this.marginLeft + (x*this.masterGap), 0);
            for(let y=0; y < this.data.rows[x].arr.length-2; y++){
                // fill(this.data[x],0,0);
                fill(colour[x]);
                rect(0,-yMod,this.blockWidth,-this.scaleMeBabes(+this.data.rows[x].arr[y+1]));
                yMod += this.scaleMeBabes(int(this.data.rows[x].arr[y+1]));
                // console.log(yMod);
            }

            noStroke();
            fill(0,255,0);
            text(this.data[x], 10,(-this.data[x])*1)
            pop();
            // console.log(scaleColor);
        }
    
    }

    Axis(){

        // THIS IS HOW WE DRAW OUR XAXIS
        line(0,0,this.width,0); 

        line(0,0,this.width,0);
        // strokeWeight(1);

        this.tGaps = this.height/(this.lineTicks);
        this.textGap = this.maxValue/(this.lineTicks);

        line(0,0,this.width,0);
        line(0,0,0,-this.height);


        for(let x=0; x<this.lineTicks+1; x++){
            line(0, x*-this.tGaps, -this.tLength, x*-this.tGaps);
            noStroke();
            fill(0);
            textSize(15);
            textAlign(RIGHT,CENTER);
            text((x*this.tickNum).toFixed(0), -10, x*-this.tGaps)
        }
    }

    // colour fucntion

    // varyColor(){
    //     let numColor = this.data.length;
    //     let range = 255;
    //     return range / numColor;
    // }

}