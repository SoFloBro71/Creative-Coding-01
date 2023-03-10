let data = [];
let chart;

let colour = ['#FF7477','#E69597', '#CEB5B7', '#B5D6D6']

function preload() {
    table = loadTable('data/Test.csv', 'csv', 'header');
}
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
    fill(colour);
    rect(0,0,blockWidth,scaleMeBabes(-fruits[x].sales));
    pop();
    }
}


// console.log(charts);


// let newChart = new BarChart(400);
// let secChart = new BarChart(200);


