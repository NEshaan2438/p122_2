x = 0;
y = 0;
sWidth = 0;
sHeight = 0;
to_number = "";
speak_data = "";
apple = "";

draw_apple = "";

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function preload() {
  apple = loadImage("apple.png");
}

function start() {
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {
  console.log(event);
  content = event.results[0][0].transcript;
  console.log(content);
  document.getElementById("status").innerHTML = "The speech has been recognized: " + content + ".";
  to_number = Number(content);
  console.log(to_number);
  if (Number.isInteger(to_number)) {
    document.getElementById("status").innerHTML = to_number + "Apples being drawn.";
    draw_apple = "set";
  } else {
    document.getElementById("status").innerHTML = "No recognizeable number has been detected.";
  }
}

function setup() {
  sWidth = window.innerWidth;
  sHeight = window.innerHeight;
  canvas = createCanvas(sWidth - 50, sHeight - 150);
  canvas.position(25, 125);
}

function draw() {
  if (draw_apple == "set") {
    draw_apple = "";
    i = 1;
    if (i <= to_number) {
      x = Math.floor(Math.random * 700);
      y = Math.floor(Math.random * 400);
      image(apple, x, y, 25, 25);
      document.getElementById("status").innerHTML = to_number + "Apples drawn.";
      speak();
      i++;
    }
  }
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = toString(to_number) + "apples drawn.";
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}
