class Graph {
  constructor(canvasId, data, dim, yScale, xScale, margin) {
    this.c = document.getElementById(canvasId);
    this.ctx = this.c.getContext("2d");

    console.log(canvasId, data, dim, yScale, xScale, margin);

    this.data = {
      x: null,
      y: null
    }
    if (data != null) {
      for (const key of Object.keys(data)) {
        let value = data[key];
        this.data[key] = value;
      }
    }

    // Dimentions of the graph, including scales
    this.dim = {
      width: "auto",
      height: "auto"
    };
    if (dim != null) {
      for (const key of Object.keys(dim)) {
        let value = dim[key];
        this.dim[key] = value;
      }
    }

    // Values pertaining to the vertical scale
    this.yScale = {
      minVal: 0,
      maxVal: 100,
      quant: 3,
      width: "auto"
    };
    if (yScale != null) {
      for (const key of Object.keys(yScale)) {
        let value = yScale[key];
        this.yScale[key] = value;
      }
    }

    // Values pertaining to the horizontal scale
    this.xScale = {
      minVal: "auto",
      maxVal: "auto",
      quant: "auto",
      height: "auto"
    };
    if (xScale != null) {
      for (const key of Object.keys(xScale)) {
        let value = xScale[key];
        this.xScale[key] = value;
      }
    }

    // Margins around the graph within the canvas element, Only used if width or height is set to "auto"
    this.margin = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    if (margin != null) {
      for (const key of Object.keys(margin)) {
        let value = margin[key];
        this.margin[key] = value;
      }
    }
    console.log("done in constructor");
  }

  line(strokeCol, fillCol, lineWidth) {
    this.ctx.strokeStyle = strokeCol;
    this.ctx.fillStyle = fillCol;
    this.ctx.lineWidth = lineWidth;
  }
  
  drawData() {

  }

  drawScales() {

  }

  draw() {
    if (this.dim.width == "auto") {
      this.dim.width = this.c.width - (this.margin.left + this.margin.right);
    }
    if (this.dim.height == "auto") {
      this.dim.height = this.c.height - (this.margin.top + this.margin.bottom);
    }
    if (this.yScale.width == "auto") {
      this.yScale.width = 35;
    }
    if (this.xScale.height == "auto") {
      this.xScale.height = 35;
    }

    // Basically the bottom left corner of the actual graph (also known as 0, 0)
    let initialXPos = parseInt(this.yScale.width + this.margin.left);
    let initialYPos = (this.c.height - this.xScale.height) - this.margin.bottom;

    this.ctx.clearRect(0, 0, this.c.width, this.c.height);

    

    this.line("rgba(101, 190, 224, 1)", "rgba(101, 190, 224, 0.5)", 2);

    // Calculates the x and y increments
    let valueRange = this.yScale.maxVal - this.yScale.minVal;
    let scaleIncrX =
      (this.dim.width - this.yScale.width) / (this.data.y.length - 1);
    let scaleIncrY =
      (this.dim.height - this.xScale.height) / valueRange;

    this.ctx.beginPath();
    this.ctx.moveTo(initialXPos, initialYPos);

    let xPos = initialXPos;

    // function for drawing the line
    this.data.y.forEach(e => {
      console.log("e: " + e)
      let val = e - this.yScale.minVal;
      let yPos = parseInt((valueRange - val) * scaleIncrY + this.margin.top, 10);

      console.log("xPos: " + xPos);
      console.log("yPos: " + yPos);
      
      this.ctx.lineTo(xPos, yPos);
      if(xPos != (this.c.width - this.margin.right)) {
        xPos += scaleIncrX;
      }
      
    });

    this.ctx.lineTo(xPos, (this.c.height - this.margin.bottom - this.xScale.height));
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();

    // Drawing the scales
    this.ctx.beginPath();
    
    this.ctx.strokeStyle = "black";

    console.log(initialXPos, initialYPos);
    console.log(initialXPos, (initialYPos - (this.dim.height - this.xScale.height)));

    this.ctx.moveTo(initialXPos, initialYPos);
    this.ctx.lineTo(initialXPos, (initialYPos - (this.dim.height - this.xScale.height)));

    this.ctx.moveTo(initialXPos, initialYPos);
    this.ctx.lineTo(initialXPos + (this.dim.width - this.yScale.width), initialYPos);

    // this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();

  }

  log() {
    console.log(this.dim, this.yScale, this.xScale, this.margin);
  }
}

var graph1 = new Graph("Canvas1", {x: [1, 2, 3, 4, 5], y: [10, 30, 25, 50, 45]}, null, null, null, {right: 20, top: 20});
graph1.draw();
graph1.log();

