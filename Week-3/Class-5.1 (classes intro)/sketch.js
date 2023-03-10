// HERE IS DATA AS AN ARRAY, REMEMBER: TO ACCESS ANA ARRAY YOU MUST USE THE arrayName[index] LIKE fruits.[2]. 
// THEN YOU CAN ACCESS THE PROPERTIES VALUES BU USING THE DOT NOTATION LIKE object.name OR IN MY CASE fruits[2].sales

let fruits = [
    // {month:"Jan", apple:22, oranges:27, peaches:32},
    // {month:"Feb", apple:45, oranges:32, peaches:2},
    // {month:"Mar", apple:32, oranges:27, peaches:65},
    // {month:"Apr", apple:1, oranges:99, peaches:32},
    {name:"Apple", sales:183},
    {name:"Oranges", sales:241},
    {name:"Peaches", sales:109},
    {name:"Grapes", sales:24},
    {name:"Bananas", sales:84},
];

let numFruits = [];

// for(let x=0; x<fruits.length; x++){
//     // for(let y=0; y<2; y++){
//         numFruits.push(fruits[x].sales);
//         // numFruits.push(fruits[x].apple);
//         // numFruits.push(fruits[x].oranges);
//         // numFruits.push(fruits[x].peaches);
//     // }
// }


// HERE IS MY LIST OF VARIABLES 

// let maxValue = Math.max(...numFruits);
Math.max(...fruits.map(object => object.sales));

let maxValue = Math.max(...fruits.map(object => object.sales));

let numBlocks = fruits.length;
let chartWidth = 400;
let chartHeight = 400;

// FOR TRANSLATION
let chartXPos = 100;
let chartYPos = 500;

let marginLeft = 20;
let marginRight= 20;

let blockGap = 10;

let screenWidth= 1000;
let screenHeight= 1000;

let lineTicks = 7;
let tLength = 10;

// THIS IS WHERE I CALCULATE MY STUFF FROM MY VARIABLES e.g BLOCK GAPS AND WIDTH

let blockWidth =(chartWidth - (marginLeft+marginRight) - ((numBlocks-1)*blockGap))/numBlocks;
// let firstBlockxPos = ((screenWidth-chartWidth)/2)+marginLeft;
let masterGap = blockWidth+blockGap;

let scaleValue = chartHeight/maxValue;
console.log(scaleValue)

let tickNum = Math.floor(maxValue/lineTicks);

let colour = ['#FF7477','#E69597', '#CEB5B7', '#B5D6D6', '#B5D6D9']

// THIS IS MY SCALE FUNCTION TO SCALEDOWN THE WHOLE BAR GRAPH

function scaleMeBabes(_value){
    return map (_value,0,maxValue,0,chartHeight)
}

function setup(){
    createCanvas(screenWidth,screenHeight);
    background(200);
    angleMode(DEGREES);
    rectMode(CORNER);
    noLoop();

    // will set a random value but will keep as that, instead of changing it to another random number each time
    // randomSeed(40);
}

// SCALING STUFF

function draw(){
    randomSeed(40);
    // TRANSLATING THE WHOLE CHART
    translate(chartXPos,chartYPos);
    // THIS LOOP DRAWS ALL OUR BARS
    for(let x=0; x<numBlocks; x++){
    push();
    textSize(20);
    textStyle(ITALIC);
    text("Fruit Sold", 150, 30);
    textAlign(CENTER, BOTTOM);
    translate(marginLeft + (x*masterGap), 0);
    fill(colour[x]);
    rect(0,0,blockWidth,scaleMeBabes(-fruits[x].sales));
    pop();
    }

    
    // THIS IS HOW WE DRAW OUR XAXIS
    // Step 1) Draw a black line horizontally -> 
    line(0,0,chartWidth,0); 

    // ADDITIONAL -> TO SET THE STROKE + WEIGHT OF A LINE -> 
    // stroke(105); 
    // strokeWeight(1);

    // STEP 2: Draw the ticks at the end of the line ->
    line(0,0,chartWidth,0);
    // stroke(105);
    strokeWeight(1);

    let tGaps = chartHeight/(lineTicks-1);
    let textGap = maxValue/(lineTicks);

    line(0,0,chartWidth,0);
    line(0,0,0,-chartHeight);


    for(let x=0; x<lineTicks; x++){
        line(0, x*-tGaps, -tLength, x*-tGaps);
        // noStroke();
        fill(100)
        textSize(15);
        textAlign(RIGHT,CENTER);
        text((x*tickNum), -10, x*-tGaps)
    }

}

