# ultrasonic_webserial

This is a demo that uses p5.js and webserial to graph serial data from an Arduino. 
Specifically, it receives ultrasonic proximity sensor data (in the form of a string containing an integer followed by a newline)
and displays it as a smoothed-out animated bar graph.

![ultrasonic](https://user-images.githubusercontent.com/442495/215823073-712225b6-25c2-4bee-b6f1-e138db45da17.gif)

This is part of a sensors lab in the *Interactive Art 2: Electronic Objects* course that I teach in the Florida State University Department of Art.

Thanks to Tom Igoe for creating the p5.js webserial functions.
