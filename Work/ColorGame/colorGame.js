var numSquares = 6;
var colors;
var pickedColor;
var messageDisplay = document.querySelector("#message")
// sets color at top
var color = document.querySelector("#color");
color.textContent = pickedColor;
// deals with squares
var squares = document.querySelectorAll(".square");
// selects buttons
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
// selects header
var h1 = document.querySelector(".headerText");

init();

function init(){
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            // Ternary Operator
            this.textContent === "EASY" ? numSquares = 3 : numSquares = 6;
            reset();
        })
    };

    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function () {

            var clickedColor = this.style.backgroundColor;
            // console.log(clickedColor, pickedColor);
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct! Nice!";
                // alert("Yes!");
                changeColors(clickedColor);
                h1.style.background = clickedColor;
                resetButton.textContent = "PLAY AGAIN?";
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again!";
            }
        });
    };

    reset();
}


function reset(){
    colors = generateRandomColors(numSquares);
    // pick new color from array
    pickedColor = pickColor();
    // change color display
    color.textContent = pickedColor;
    resetButton.textContent = "NEW COLORS";
    // change colors 
    for (var i = 0; i < squares.length; i++) {
        if(colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    // change h1 background
    h1.style.background = "steelblue";
    messageDisplay.textContent = "";
};

resetButton.addEventListener("click", function(){
    reset();
});

function changeColors(color){
    for(var i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = color;
    }
}

function pickColor(){
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num){
    var arr = [];
    for(i = 0; i<num; i++) {
        arr.push(randomColor());
    }
    return arr;
}

function randomColor(){
    var red = Math.floor(Math.random()*256);
    var blue = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    return "rgb(" + red + ", " + blue + ", " + green + ")";
}