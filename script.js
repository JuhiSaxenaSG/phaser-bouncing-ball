let WIDTH = 700;
let HEIGHT = 500;

const config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let ball;
let ballSize = 80;
let yspeed = 0.5;
let xspeed = 1.0;
let score = 0;
let scoreText;
let lives = 10;
let livesText;

function preload() {
    this.load.image("ball", "assets/ball.png"); // watch out for case sensitivity
}

function create() {
    ball = this.add.sprite(WIDTH / 2, HEIGHT / 2, "ball"); // x, y, and the ball "key"
    ball.setDisplaySize(ballSize, ballSize); // width, height

    // Add click event listener to the ball
    ball.setInteractive();
    ball.on('pointerdown', function () {
        // Reduce ball size by 10%
        ballSize *= 0.9;
        ball.setDisplaySize(ballSize, ballSize);

        // Increase speed by 10%
        yspeed *= 1.1;
        xspeed *= 1.1;

        // Increase score by 1
        score += 1;
        scoreText.setText('Score: ' + score);
    });

    // Display score
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });

    // Display lives
    livesText = this.add.text(16, 50, 'Lives: 10', { fontSize: '32px', fill: '#fff' });
}

function update() {
    ball.y += yspeed;
    ball.x += xspeed;

    // The || sign means "or"
    if (ball.y >= HEIGHT - ballSize / 2 || ball.y <= ballSize / 2) {
        // Multiplying by -1 will "flip" the direction
        yspeed *= -1;
        // Decrease lives by 1
        lives -= 1;
        livesText.setText('Lives: ' + lives);
    }

    if (ball.x >= WIDTH - ballSize / 2 || ball.x <= ballSize / 2) {
        xspeed *= -1;
        // Decrease lives by 1
        lives -= 1;
        livesText.setText('Lives: ' + lives);
    }

    // Check for game over
    if (lives <= 0) {
        this.add.text(WIDTH / 2 - 170, HEIGHT / 2 - 50, 'Game Over', { fontSize: '64px', fill: '#ff0000' });
        this.scene.pause();
    }
}
