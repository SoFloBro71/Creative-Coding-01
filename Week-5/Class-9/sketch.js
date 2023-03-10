// DATA SETS
let data;
let data2;
let data3;

// CHARTS
let chart;
let chart2;
let chart3;

function preload() {
    data = loadTable('data/Test.csv', 'csv', 'header');

    data2 = loadTable('data/Afforestation.csv', 'csv', 'header');
    
    data3 = loadTable('data/Suicide_Rates.csv', 'csv', 'header');

}

function setup(){
    // MAKES THE TEXT CLEARER DUE TO DIFFERENT RESOLUTIONS ON COMPUTER
    pixelDensity(6);
    createCanvas(1200,1000);
    background(0);
    noLoop();
    chart = new HozBarChart(400,400,100,450,"Afforestation",data2,"Total","County");
    chart2 = new StackedChart(400,300,10,500,"Suicide_Rates",data3,"Total","Year");
    chart3 = new BarChart(400,400,600,-500,"Afforestation",data2,"Total","County");
}

function draw(){
    chart.letsDraw();
    chart2.render();
    chart3.draw();
}