let p1, p2, p3, p4;
var grid;
var next;

var dA1 = 1;
var dB1 = 0.5;
var feed1 = 0.055;
var k1 = 0.062;
var dA2 = 0.21;
var dB2 = 0.11;
var feed2 = 0.03;
var k2 = 0.062;
var dA3 = 0.21;
var dB3 = 0.11;
var feed3 = 0.014;
var k3 = 0.054;
var dA4 = 0.21;
var dB4 = 0.11;
var feed4 = 0.029;
var k4 = 0.057;


function setup() {
  let c = createCanvas(windowHeight, windowHeight);
  pixelDensity(1);
  imageMode(CENTER);

  p1 = createGraphics(100, 100);
  p2 = createGraphics(100, 100);
  p3 = createGraphics(100, 100);
  p4 = createGraphics(100, 100);
  
  grid = [];
  next = [];
  for (var x = 0; x < width; x++) {
    grid[x] = [];
    next[x] = [];
    for (var y = 0; y < height; y++) {
      grid[x][y] = {
        a: 1,
        b: 0,
      };
      next[x][y] = {
        a: 1,
        b: 0,
      };
    }
  }
}

function mousePressed() {

  if (hover(width/4,height/4,width/2) == true) {
    for (var i = p1.width / 2 - 12; i < p1.width / 2 + 12; i++) {
      for (var j = p1.height / 2 - 12; j < p1.height / 2 + 12; j++) {
        grid[i][j].b = 1;
      }
    }
  } 
  
  if ( hover(3*width/4,height/4,width/2) == true) {
    for (var k = p2.width / 2 - 20; k < p2.width / 2 + 20; k++) {
      for (var l = p2.height / 2 - 20; l < p2.height / 2 + 20; l++) {
        grid[k][l].b = 1;
      }
    }
  } 
  
  if (
    hover(width/4,3*height/4,width/2) == true) {
    for (var m = p3.width / 2 - 20; m < p3.width / 2 + 20; m++) {
      for (var n = p3.height/2 - 20; n < p3.height / 2 + 20; n++) {
        grid[m][n].b = 1;
      }
    }
  } 
  
  if (hover(3*width/4,3*height/4,width/2) == true) {
    for (var o = p4.width/2 - 20; o < p4.width / 2 + 20; o++) {
      for (var p = p4.height/2 - 20; p < p4.height/2 + 20; p++) {
        grid[o][p].b = 1;
      }
    }
  }
}

function draw() {
  background(0);

  pattern1();
  pattern2();
  pattern3();
  pattern4();

  image(p1, width / 4, height / 4, width/2, height/2);
  image(p2, (3 * width) / 4, height / 4, width/2, height/2);
  image(p3, width / 4, (3 * height) / 4, width/2, height/2);
  image(p4, (3 * width) / 4, (3 * height) / 4, width/2, height/2);

}

function pattern1() {
  for (let x = 1; x < p1.width - 1; x++) {
      for (let y = 1; y < p1.height - 1; y++) {
        let a = grid[x][y].a;
        let b = grid[x][y].b;
        next[x][y].a = a + dA1 * laplaceA(x, y) - a * b * b + feed1 * (1 - a);
        next[x][y].b = b + dB1 * laplaceB(x, y) + a * b * b - (k1 + feed1) * b;

        next[x][y].a = constrain(next[x][y].a, 0, 1);
        next[x][y].b = constrain(next[x][y].b, 0, 1);
      }
    }

    p1.loadPixels();
    for (let x = 0; x < p1.width; x++) {
      for (let y = 0; y < p1.height; y++) {
        let pix = (x + y * p1.width) * 4;
        let a = next[x][y].a;
        let b = next[x][y].b;
        let c = floor((a - b) * 255);
        c = constrain(c, 0, 255);
        p1.pixels[pix + 0] = 155 + c / 8;
        p1.pixels[pix + 1] = 255 - c / 2;
        p1.pixels[pix + 2] = c;
        p1.pixels[pix + 3] = 255;
      }
    }
    p1.updatePixels();

   swap();
}

function pattern2() {
  for (let x = 1; x < p2.width - 1; x++) {
    for (let y = 1; y < p2.height - 1; y++) {
      let a = grid[x][y].a;
      let b = grid[x][y].b;
      next[x][y].a = a + dA2 * laplaceA(x, y) - a * b * b + feed2 * (1 - a);
      next[x][y].b = b + dB2 * laplaceB(x, y) + a * b * b - (k2 + feed2) * b;

      next[x][y].a = constrain(next[x][y].a, 0, 1);
      next[x][y].b = constrain(next[x][y].b, 0, 1);
    }
  }

  p2.loadPixels();
  for (let x = 0; x < p2.width; x++) {
    for (let y = 0; y < p2.height; y++) {
      let pix = (x + y * p2.width) * 4;
      let a = next[x][y].a;
      let b = next[x][y].b;
      let c = floor((a - b) * 255);
      c = constrain(c, 0, 255);
      p2.pixels[pix + 0] = 190 + c / 50;
      p2.pixels[pix + 1] = c;
      p2.pixels[pix + 2] = 255 - c / 20;
      p2.pixels[pix + 3] = 255;
    }
  }
  p2.updatePixels();

  swap();
}

function pattern3() {
  for (let x = 1; x < p3.width - 1; x++) {
      for (let y = 1; y < p3.height - 1; y++) {
        let a = grid[x][y].a;
        let b = grid[x][y].b;
        next[x][y].a = a + dA3 * laplaceA(x, y) - a * b * b + feed3 * (1 - a);
        next[x][y].b = b + dB3 * laplaceB(x, y) + a * b * b - (k3 + feed3) * b;

        next[x][y].a = constrain(next[x][y].a, 0, 1);
        next[x][y].b = constrain(next[x][y].b, 0, 1);
      }
    }
     p3.loadPixels();
    for (let x = 0; x < p3.width; x++) {
      for (let y = 0; y < p3.height; y++) {
        let pix = (x + y * p3.width) * 4;
        let a = next[x][y].a;
        let b = next[x][y].b;
        let c = floor((a - b) * 255);
        c = constrain(c, 0, 255);
        p3.pixels[pix + 0] = c;
        p3.pixels[pix + 1] = 255 - c / 40;
        p3.pixels[pix + 2] = 155 + c / 23;
        p3.pixels[pix + 3] = 255;
      }
    }
    p3.updatePixels();
  
  swap();
}
function pattern4() {
  for (let x = 1; x < p4.width - 1; x++) {
      for (let y = 1; y < p4.height - 1; y++) {
        let a = grid[x][y].a;
        let b = grid[x][y].b;
        next[x][y].a = a + dA4 * laplaceA(x, y) - a * b * b + feed4 * (1 - a);
        next[x][y].b = b + dB4 * laplaceB(x, y) + a * b * b - (k4 + feed4) * b;

        next[x][y].a = constrain(next[x][y].a, 0, 1);
        next[x][y].b = constrain(next[x][y].b, 0, 1);
      }
    } 

  p4.loadPixels();
  for (let x = 0; x < p4.width; x++) {
    for (let y = 0; y < p4.height; y++) {
      let pix = (x + y * p4.width) * 4;
      let a = next[x][y].a;
      let b = next[x][y].b;
      let c = floor((a - b) * 255);
      c = constrain(c, 0, 255);
      p4.pixels[pix + 0] = 70 + c / 40;
      p4.pixels[pix + 1] = c;
      p4.pixels[pix + 2] = 230 - c / 3;
      p4.pixels[pix + 3] = 255;
    }
  }
  p4.updatePixels();

  swap();
}

function laplaceA(x, y) {
  var sumA = 0;
  sumA += grid[x][y].a * -1;
  sumA += grid[x - 1][y].a * 0.2;
  sumA += grid[x + 1][y].a * 0.2;
  sumA += grid[x][y + 1].a * 0.2;
  sumA += grid[x][y - 1].a * 0.2;
  sumA += grid[x - 1][y - 1].a * 0.05;
  sumA += grid[x + 1][y - 1].a * 0.05;
  sumA += grid[x + 1][y + 1].a * 0.05;
  sumA += grid[x - 1][y + 1].a * 0.05;
  return sumA;
}

function laplaceB(x, y) {
  var sumB = 0;
  sumB += grid[x][y].b * -1;
  sumB += grid[x - 1][y].b * 0.2;
  sumB += grid[x + 1][y].b * 0.2;
  sumB += grid[x][y + 1].b * 0.2;
  sumB += grid[x][y - 1].b * 0.2;
  sumB += grid[x - 1][y - 1].b * 0.05;
  sumB += grid[x + 1][y - 1].b * 0.05;
  sumB += grid[x + 1][y + 1].b * 0.05;
  sumB += grid[x - 1][y + 1].b * 0.05;
  return sumB;
}

function swap() {
  var temp = grid;
  grid = next;
  next = temp;
}

function hover(x,y,w) {
  if(dist(mouseX,mouseY,x,y) <w/2) {
    return true;
  } else {
    return false;
  }
}

function keyTyped() {
  if (key === 's') {
    saveCanvas(c, 'myCanvas', 'jpg');
  }
}

