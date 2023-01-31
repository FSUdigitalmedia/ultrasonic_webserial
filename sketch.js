/*
Serial read data and graph using p5.webserial
Listens for an ASCII string with a newline at the end.

Lists serial ports in a browser selection window. 
When you choose a port, it opens the port and 
graphs the incoming data.

created 31 May 2022
modified 11 Jun 2022
by Tom Igoe

adapted 1 Jan 2023 
by Rob Duarte
*/

// variable to hold an instance of the p5.webserial library:
const serial = new p5.WebSerial();
let inData; // variable for incoming serial data

let w = 0; // width of the bar graph
const speed = .02; // how quickly the bar graph should grow/shrink

function setup() {
  createCanvas(660,100);
  background(255);
  noStroke();

  // set up all of the functions that will deal with serial stuff
  // the functions are defined in a separate file (serialfunctions.js)
  if (!navigator.serial) {
    alert("WebSerial is not supported in this browser. Try Chrome or MS Edge.");
  }
  serial.getPorts();                    // find serial ports
  serial.on("noport", makePortButton);  // choose a serial port
  serial.on("portavailable", openPort); // open the port
  serial.on("requesterror", portError); // handle serial errors
  serial.on("data", serialEvent);       // handle incoming serial data
  serial.on("close", makePortButton);
  // add serial connect/disconnect listeners:
  navigator.serial.addEventListener("connect", portConnect);
  navigator.serial.addEventListener("disconnect", portDisconnect);
}

function draw() {
  if (inData >= 2 && inData < 200) { // try to keep out weird data
    background(255);
    
    let distance = inData - w; // distance between current value and previous one
    w = w + (distance*speed);  // how we smooth out the jittery movement of the bar
    
    let wScaled = w*3; // scale it up so it's more visible on screen
    // and change color of the bar based on how big it is on screen...
    if (wScaled < 30) { fill("red") } 
    else if (wScaled < 120) { fill("orange") } 
    else { fill("green") }

    rect(40, height/2, wScaled, 50); 

    fill("black");
    text(inData, w*3+50, height/2+28);
  }
}
