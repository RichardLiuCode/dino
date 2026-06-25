const ctx = document.getElementById("gameDisplay").getContext("2d");
let isGameStarted = false;
const dinoImg = new Image();
dinoImg.src = "./dino.png";
dinoImg.width = 50;
dinoImg.height = 50;
const obstacleImg = new Image();
obstacleImg.src = "./obstacle.png";
dinoImg.addEventListener("load", function () {
    if (!isGameStarted) {
        ctx.drawImage(dinoImg, 20, 20, 160, 160);
    }
});
ctx.font = "50px arial";
ctx.fillStyle = "gray";
ctx.fillText("Dinosaur Game", 200, 60);
ctx.font = "20px arial";
ctx.fillText("This is the dinosaur game you see when google chrome browser is offline", 200, 90);
ctx.fillText("Press Space bar, arrow up key, or click to jump.", 200, 115);
ctx.fillText("Click to start game", 200, 140);

document.getElementById("gameDisplay").addEventListener("click", function (e) {
    if (isGameStarted) return;
    isGameStarted = true;
    let keyPressed = false;
    let dinosaurYPosition = 150;
    let obstacles = [{ type: 1, x: 1000 }];
    let speed = 5;
    let x = 5;
    let distance = 0;
    document.addEventListener("keydown", function (e) {
        if (e.key == "ArrowUp" || e.code == "Space") keyPressed = true;
    });
    document.addEventListener("mousedown", function (e) {
        if (isGameStarted) keyPressed = true;
    });
    const endGame = function () {
        gameLoops.forEach(function (loop) {
            clearInterval(loop);
        });
        ctx.clearRect(0, 0, 1000, 200);
        setTimeout(function () {
            ctx.clearRect(0, 0, 1000, 200);
            ctx.fillStyle = "Gray";
            ctx.font = "60px Arial";
            ctx.fillText("Game Over", 350, 60);

            ctx.font = "20px Arial";
            ctx.fillText("Click to restart", 350, 90);

            ctx.fillStyle = "gray";
            ctx.font = "20px gray";
            ctx.fillText(distance.toString().slice(0, distance.toString().length - 1).padStart(8, "0"), 905, 20);
        }, 100);
        isGameStarted = false;
    };
    const gameLoops = [
        setInterval(function () {
            ctx.clearRect(0, 0, 1000, 200);
            if (keyPressed) {
                if (x >= 95) {
                    dinosaurYPosition = 150;
                    keyPressed = false;
                    x = 5;
                } else {
                    dinosaurYPosition = 0.05 * Math.pow(x - 50, 2) + 50;
                    x = x + 1.3;
                }
            }
            ctx.drawImage(dinoImg, 50, dinosaurYPosition, 50, 50);
            obstacles.forEach(function (obstacle) {
                if (obstacle.x <= -100) {
                    obstacles.splice(obstacles.indexOf(obstacle), 1);
                }
                if (obstacle.type == 1) {
                    ctx.drawImage(obstacleImg, obstacle.x, 150, 50, 50);
                    obstacle.x -= speed;
                    if ((dinosaurYPosition <= 150 && dinosaurYPosition >= 135 && obstacle.x < 90 && obstacle.x > 50)) {
                        endGame();
                    }
                    if ((dinosaurYPosition > 100 && obstacle.x < 30 && obstacle.x > 0)) {
                        endGame();
                    }
                }
                distance += Math.round(speed / 10);

            });
            ctx.fillStyle = "gray";
            ctx.font = "20px gray";
            ctx.fillText(distance.toString().slice(0, distance.toString().length - 1).padStart(8, "0"), 905, 20);
        }, 10),
        setInterval(function () {
            setTimeout(function () {
                obstacles.push({ type: 1, x: 1000 });
            }, Math.floor(Math.random() * 501));
        }, 1000),
        setInterval(function () {
            speed += 1;
        }, 15000),
        setInterval(function () {
            if (isGameStarted) {
                if (new URL(dinoImg.src).pathname.replace(/\//g, "").includes("dino.png")) {
                    dinoImg.src = "./dino2.png";
                } else {
                    dinoImg.src = "./dino.png";
                }
            }
        }, 100)];
});
document.getElementById("gameDisplay").addEventListener("contextmenu", function (e) {
    if (isGameStarted) {
        e.preventDefault();
    }
});
