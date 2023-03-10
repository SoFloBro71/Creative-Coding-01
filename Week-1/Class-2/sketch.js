
let data = [23,1200,125,390,43,262,157,110,20];

let maxValue = (Math.max(...data));


let numBlocks = data.length;
let chartWidth = 300;
let chartHeight = 400;
let marginLeft = 20;
let marginRight=5;
let blockGap = 10;
let screenWidth=500;
let screenHeight=500;

let blockWidth =(chartWidth - (marginLeft+marginRight) - ((numBlocks-1)*blockGap))/numBlocks;
let firstBlockxPos = ((screenWidth-chartWidth)/2)+marginLeft;
let masterGap = blockWidth+blockGap;

let scaleValue = chartHeight/maxValue;

console.log(scaleValue)




function setup(){
    createCanvas(screenWidth,screenHeight);
    background(200);
    angleMode(DEGREES);
    rectMode(CORNER);
    noLoop();



    // will set a random value but will keep as that, instead of changing it to another random number each time
    // randomSeed(40);
}

function draw(){
    background(200);
    fill (0);
    for(let x=0;x<numBlocks;x++){
    push();
    translate(firstBlockxPos + (x*masterGap), 400)
    noStroke();
    fill(data[x],255,255);
    rect (0,0,blockWidth,-data[x]);
    pop();
    }
}



// Parameter Pass with function

// function bark(_numBarks){

//     for(let x=0; x<_numBarks; x++){
//         console.log("bark")
//     }

// }

// bark(3);

// function squarer(_num){

//     let squared = _num * _num;
//     return squared
// }

// squarer(3);




// SCALING STUFF

// function scaleMeBabes(_num){
    // let scaleValue = chartHeight/maxValue;
    // return _num * scaleValue;

// }

// function draw(){

//     background(200);
//     fill (0);
//     for(let x=0;x<numBlocks;x++){
//     push();
//     translate(firstBlockxPos + (x*masterGap), 450)
//     rect(0,0,blockWidth,scaleMeBabes(-data[x]));
//     pop();
//     }
// }


// MUST GO UP AT TOP 
// let data = [23,1200,125,390,23];
// let maxValue = (Math.max(...data));
// let scaleValue = chartHeight/maxValue;

// console.log(scaleValue)