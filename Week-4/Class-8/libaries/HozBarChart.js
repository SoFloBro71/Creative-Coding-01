class HozBarChart { 

    constructor(_data, _chartWidth, _chartHeight, _xTranslate, _yTranslate) { 

        this.data = _data; 
        this.chartWidth = _chartWidth; 
        this.chartHeight = _chartHeight; 

        this.xTranslate = _xTranslate; 
        this.yTranslate = _yTranslate; 

        this.mappedData = this.mapData(_data); 
        this.barSpacing = 5; 
        this.sideMargin = 10; 
        this.numTicks = 10; 
        this.tickSpacing = this.chartHeight / this.numTicks; 
        this.barWidth = this.calcBarWidth() 

    } 
    render() { 
        push(); 
        // let xTranslate = (screenWidth - this.chartWidth) / 2 
        // let yTranslate = screenHeight - ((screenHeight - this.chartHeight) / 2) 
        translate(this.xTranslate, this.yTranslate) 
        for (let i = 0; i < this.mappedData.length; i++) { 
            // We only have a four colour palette. We use modulus to select a colour 
            let colorNumber = i % 4 
            fill(color(palette[colorNumber])); 
            noStroke() 
            // We draw the bars using the incrementing i value within the loop 
            let barPos = (i * this.barWidth) + (i * this.barSpacing) + this.sideMargin 
            rect(barPos, 0, this.barWidth, -this.mappedData[i]); 

            // We draw the Text data values 
            fill(255) 
            textAlign(CENTER, BOTTOM) 
            text(this.mappedData[i].total, barPos + this.barWidth / 2, -this.mappedData[i]) 

            // We draw the category values 
            // Because we are rotating we use the translate method here 
            push() 
            translate(barPos + this.barWidth / 2, 10) 
            rotate(PI / 2) 
            textAlign(LEFT, CENTER) 
            text(this.data[i].name, 0, 0) 
            pop() 

        } 

        // We draw the x-Axis 
        noFill() 
        stroke(200) 
        line(0, 0, this.chartWidth, 0) 

        //We draw the y-Axis 
        noFill() 
        stroke(255) 
        line(0, 0, 0, -this.chartHeight) 

        // Here we add a title 
        fill(255) 
        textAlign(LEFT, BOTTOM); 
        textSize(18) 
        text('FRUIT SALES 2021', -40, -this.chartHeight - 40) 

        // Here we add ticks and vlaues to the y-Axis 
        // Probably shoud store this as a global variable 
        let allTotals = this.data.map((x) => x.total); 
        let maxValue = max(allTotals) 
        let increments = maxValue / this.numTicks
        for (let i = 0; i <= this.numTicks; i++) { 
            // Ticks 
            noFill() 
            stroke(255) 
            line(0, -i * this.tickSpacing, -5, -i * this.tickSpacing); 

            // Values 
            textAlign(RIGHT, CENTER); 
            textSize(10) 
            let label = int(i * increments); 
            noStroke(); 
            fill(255) 
            text(label, -15, -i * this.tickSpacing) 
        } 

        pop() 
    } 

    mapData(array) { 
        let tempMap = []; 
        let allTotals = this.data.map((x) => x.total); 
        console.log(allTotals) 
        let maxValue = max(allTotals) 
        console.log(maxValue) 

        for (let i = 0; i < array.length; i++) { 
            console.log(this.chartHeight) 
            tempMap.push(map(array[i].total, 0, maxValue, 0, this.chartHeight)) 
        } 
        console.log(tempMap) 
        return tempMap 
    } 

    calcBarWidth() { 
        let availableWidth = this.chartWidth - (this.sideMargin * 2); 
        let totalSpacingWidth = this.barSpacing * (this.data.length - 1); 
        let availableBarWidth = availableWidth - totalSpacingWidth; 
        let barWidth = availableBarWidth / this.data.length 
        return barWidth 
    } 

} 