var player, laser, enemy, score, leftEdge;
score = 0
function setup() {
    createCanvas(600, 600)
    player = createSprite(300, 560, 30, 30)
    player.shapeColor = "black"
    player.velocityX = 15

    leftEdge = createSprite(0, 300, 5, 600)
    leftEdge.visible = false

    enemy = createSprite(650, random(30, 500), 30, 30);
    enemy.visible = false;

    laser = createSprite(player.x, player.y - 20, 5, 20);
    laser.x = 800;
}

function draw() {
    background("white")
    if (player.x > 600) {
        player.x = -100
    }

    if (frameCount%50 === 0) {
        enemy.visible = true
        enemy.shapeColor = "blue"
        enemy.velocityX = random(-5, -10)
    }

    if (laser.isTouching(enemy)) {
        enemy.destroy()
        score+=1
        enemy = createSprite(650, random(30, 500), 30, 30);
    }

    if (enemy.collide(leftEdge)) {
        score-=1
        enemy.destroy();
        enemy = createSprite(650, random(30, 500), 30, 30);
    }

    if (score < 0) {
        score = 0;
    }

    text("Score: " + score, 300, 100)
    drawSprites();
}

function keyPressed() {
    if (keyCode === 32) {
        laser = createSprite(player.x, player.y - 20, 5, 20);
        laser.velocityY = -30;
        laser.shapeColor = "red";
        laser.lifeTime = 600/30
    }
}