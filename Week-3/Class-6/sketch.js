// let data = [
//     {fruit:"Apple",sales:200},
//     {fruit:"Oranges",sales:800},
//     {fruit:"Pears",sales:400},
// ];

// MUST BE AN EMPTY ARRAY OR IT WONT PUSH INTO THE ARRAY
let data = [];

let table;

// LOADS EXCEL FILE - FILE MUST BE IN A FOLDER AND BE A CSV.MACINTOSH FILE
function preload() {
    table = loadTable('data/Fruit_Sales.csv', 'csv', 'header');
}

// CLEANS DATA AND PUSHES INTO THE DATA ARRAY
function tidyData(){
    for(let x=0; x<table.getRowCount(); x++){
        // PUSHING STUFF INTO DATA
        data.push(table.rows[x].obj);
    }
}

function setup(){
    tidyData();

    createCanvas(500,500);

}
function draw(){
    background(200);

}

