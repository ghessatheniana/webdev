var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var jumping = 0;
var counter = 0;
var gameInterval;

hole.addEventListener('animationiteration', () => {
    var random = -((Math.random() * 300) + 150);
    hole.style.top = random + "px";
    counter++;
});

function startGame() {
    gameInterval = setInterval(updateGameArea, 10);
}

function updateGameArea() {
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));

    if (jumping == 0) {
        character.style.top = (characterTop + 3) + "px";
    }
    var blockleft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var cTop = -(500 - characterTop);
    if ((characterTop > 480) || ((blockleft < 20) && (blockleft > -50) && ((cTop < holeTop) || (cTop > holeTop + 130)))) {
        clearInterval(gameInterval);
        alert("Game over. Score: " + (counter - 1));
        character.style.top = 100 + "px";
        counter = 0;
        startGame(); // Restart the game
    }
}

function jump() {
    if (jumping == 0) {
        jumping = 1;
        let jumpCount = 0;
        var jumpInterval = setInterval(function () {
            var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
            if ((characterTop > 6) && (jumpCount < 15)) {
                character.style.top = (characterTop - 5) + "px";
            }

            if (jumpCount > 20) {
                clearInterval(jumpInterval);
                jumping = 0;
                jumpCount = 0;
            }
            jumpCount++;
        }, 10);
    }
}

function moveCharacter(event) {
    if (event.keyCode == 32) { // Spacebar key
        jump();
    }
}

startGame(); // Start the game when the page loads