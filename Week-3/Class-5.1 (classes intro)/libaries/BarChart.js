class BarChart{
    constructor(_height,_width,_posX,_posY,_data){
        this.height = _height;
        this.width = _width;
        this.posX = _posX;
        this.posY = _posY;
        this.data = _data;

        
        // let maxValue = Math.max(...numFruits);
        Math.max(...this.data);

        this.maxValue = Math.max(...fruits.map(object => object));

        this.numBlocks = this.data.length;
        this.blockGaps = 10;
        this.marginLeft = 20;

        this.blockWidth = (this.width - (this.marginLeft + this.marginLeft) - ((this.numBlocks-1) * this.blockGaps)) / this.numBlocks;


        this.masterGap = 50;
        this.lineTicks = 5;
        this.tLength = 10;
        
        this.tickNum = this.maxValue/this.lineTicks;
    }

    render(){
        push()
        translate(this.posX, this.posY)
        noFill()
        stroke(50)
        line(0,0,0,-this.height)
        line(0,0,this.width,0)

        this.barLoops()
        this.Axis();
        pop()
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
        return map (_value,0,this.maxValue,0,this.height)
    
    }


    barLoops(){
       // THIS LOOP DRAWS ALL OUR BARS
        let scaleColor = this.varyColor();

        for(let x=0; x<this.data.length; x++){
            push();
            translate(this.marginLeft + (x*this.masterGap), 0)
            fill(this.data[x],0,0);
            rect(0,0,this.blockWidth,this.scaleMeBabes(-this.data[x]));
            noStroke();
            fill(0,255,0);
            textStyle(ITALIC);
            text("Fruit Sold", 150, 30);
            textAlign(CENTER, BOTTOM);
            pop();
            console.log(scaleColor);
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

    varyColor(){
        let numColor = this.data.length;
        let range = 255;
        return range / numColor;
    }

    // STACKED BAR CHART

//     stackedChart(){
//         let scaleColor = this.varyColor();

//         for(let x=0; x<this.data.length; x++){
//             push();
//             translate(this.marginLeft + (x*this.masterGap), 0)
//             fill(this.data[x],0,0);
//             rect(0,0,this.blockWidth,this.scaleMeBabes(-this.data[x]));
//             noStroke();
//             fill(0,255,0);
//             text(this.data[x], 10,(-this.data[x])*1)
//             pop();
//             console.log(scaleColor);
//         }
//     }
}