let data = [];
let charts = [];
let table;

let screenWidth= 1000;
let screenHeight= 1000;

let colour = ['#FF7477','#E69597', '#CEB5B7', '#B5D6D6']

function preload() {
    table = loadTable('data/Test.csv', 'csv', 'header');
}

function tidyData(){
    for(let x=0; x<table.getRowCount(); x++){
        // PUSHING STUFF INTO DATA
        data.push(table.rows[x].obj);
    }
}

function setup(){
    tidyData();
    createCanvas(screenHeight,screenWidth);
    background(200);
    angleMode(DEGREES);
    rectMode(CORNER);

    // // pushing objects into array
    // for(let x=0; x<1; x++){
    //     // charts.push(20);
    //     let _randomNum = Math.floor(random(0,400));
    //     charts.push(new BarChart(_randomNum));
    // }

    // MAKING TWO NEW BARCHARTS

    // charts.push(new BarChart(400,400,50,450,fruits));
    charts.push(new stackedChart(200,200,50,250,table));
}

function draw(){
    charts[0].render();
    
}

// console.log(charts);


// let newChart = new BarChart(400);
// let secChart = new BarChart(200);