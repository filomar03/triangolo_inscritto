let btn = document.querySelector("button");
let halfX;
let halfY;
let points = 50;
let scale;
let darkTheme = false;

function Click() {
  if (!darkTheme) {
    btn.innerHTML = "dark theme";
    darkTheme = true;
  } else {
    btn.innerHTML = "light theme";
    darkTheme = false;
  }
}

function setup() {
  createCanvas(750, 750);
  halfX = width / 2;
  halfY = height / 2;
  scale = halfX - halfX / 8;
  frameRate(144);
}

function draw() {
  if (!darkTheme) {
    background(255);
    stroke(0);
  } else {
    background(0);
    stroke(255);
  }
  strokeWeight(3);
  
  push();
  translate(width / 2, height / 2 + scale / 2);
  for(let j = 0; j < points; j++) {
    line(scale * cos(HALF_PI / points * j), -scale * sin(HALF_PI / points * j), scale * cos(HALF_PI / points * (j + 1)), -scale * sin(HALF_PI / points * (j + 1)));
    line(-scale * cos(HALF_PI / points * j), -scale * sin(HALF_PI / points * j), -scale * cos(HALF_PI / points * (j + 1)), -scale * sin(HALF_PI / points * (j + 1)));
  }
  line(scale * cos(0), scale * sin(0), -scale * cos(0), scale * sin(0));
  pop();
  let cY = abs(mouseY - (height / 2 + scale / 2));
  let cX = mouseX - halfX;
  let ipo = sqrt(cX**2 + cY**2); 
  let angle = asin(cY / ipo);
  line(halfX - scale, height / 2 + scale / 2, halfX + scale * cos(angle) * Sign(cX), height / 2 + scale / 2 - scale * sin(angle));
  line(halfX + scale, height / 2 + scale / 2, halfX + scale * cos(angle) * Sign(cX), height / 2 + scale / 2 - scale * sin(angle));
  let c11 = scale * cos(angle) * Sign(cX) + scale;
  let c2 = scale * sin(angle);
  let ipo1 = sqrt(c11**2 + c2**2);
  let a1 = asin(c2 / ipo1);
  //console.log("c1: " + c11 + "c2: " + c2 + "ipo: " + ipo1 + "a1: " + degrees(a1));
  let c12 = abs(scale * cos(angle) * Sign(cX) - scale);
  let ipo2 = sqrt(c12**2 + c2**2);
  let a2 = asin(c2 / ipo2);
  //console.log("c1: " + c12 + "c2: " + c2 + "ipo: " + ipo2 + "a1: " + a2);
  textSize(height / 15);
  text(round(degrees(a1)), halfX - scale, height / 2 + scale / 2 + halfY / 7);
  text(round(degrees(a2)), halfX + scale / 20 * 16.7, height / 2 + scale / 2 + halfY / 7);
  text(round(180 - (degrees(a1) + degrees(a2))), halfX + scale * cos(angle) * Sign(cX) - scale / 11.5, height / 2 + scale / 2 - scale * sin(angle) - halfY / 15);
}

function Sign(num) {
  if (isNaN(num / abs(num))) { return 1; }
  return num / abs(num);
}