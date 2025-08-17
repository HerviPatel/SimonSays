let gameSequence = [];
let userSequence = [];

let btns = ["blue","yellow", "orange", "red"];
let gameStart = false;
let level = 0;

let h3 = document.querySelector("h3");

let gameRules = document.getElementById("rules");
let closeRules = document.getElementById("closeRules");

window.onload = function(){
    gameRules.classList.add("show");
}

closeRules.addEventListener("click",function(){
    gameRules.classList.remove("show");
});


document.addEventListener("click", function(){
    if(!gameStart && !event.target.classList.contains("btn") && !event.target.classList.contains("cRules")) {
        restart();
        gameStart = true;
        levelUp();

    }  
});

function buttonFlash(btnF){
    btnF.classList.add("bFlash"); 
    setTimeout(function(){
        btnF.classList.remove("bFlash");
    }, 200);
}

let levelOverlay = document.getElementById("levelOverlay");
let gameArea = document.getElementById("gameArea");


function levelUp(){
    userSequence = [];

    level++;
    h3.innerText = `Level ${level}`;

    levelOverlay.innerText = `Level ${level}`;
    levelOverlay.style.opacity = "1";
    gameArea.classList.add("blur-background");

    setTimeout(() => {
        levelOverlay.style.opacity = "0";
        gameArea.classList.remove("blur-background");

    let gameInx = Math.floor(Math.random()*4);
    let btnColor = btns[gameInx];
    let gameBtn = document.querySelector(`#${btnColor}`);
    gameSequence.push(btnColor);
    buttonFlash(gameBtn);
}, 1000);
}

function userTurn() {
    let btn = this;
    buttonFlash(btn);
    let pressedBtn = btn.getAttribute("id");
    userSequence.push(pressedBtn);
    checkSequence(userSequence.length - 1);
}

let allButtons = document.querySelectorAll(".btn");
for(let btn of allButtons){
    btn.addEventListener("click", userTurn);
}

function checkSequence(idx) {

    if (userSequence[idx] === gameSequence[idx]){
        if(userSequence.length == gameSequence.length){
            setTimeout(levelUp , 1000);
        }
    }
    else{
        h3.innerHTML = `Uh oh! You pressed the wrong button! <br> Your final score is : ${level-1}. <br> Click anywhere to restart the game.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 200);

        gameStart = false;
    }
}


function restart() {  
    gameSequence = [];
    userSequence = [];
    level = 0;
}

