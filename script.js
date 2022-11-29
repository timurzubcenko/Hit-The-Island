const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const score = document.querySelector('.score')

const canvasWidth = canvas.width
const canvasHeight = canvas.height
const background = 'white'
const random = Math.round(Math.random() * 1)
console.log(random)

let ballXDirection = 1
let ballYDirection = 1
let ballSpeed = 2
let scoreTxt = 0

console.log(canvasWidth)

const paddle = {
    x: canvasWidth / 2 - 50,
    y: canvasHeight - 35,
    width: 100,
    height: 20,
    speed: 4,
    color: 'black',
    rightPressed: false,
    leftPressed: false,
}

const island = {
    x: canvasWidth / 2 - 60,
    y: 10,
    width: 120,
    height: 25,
    color: 'black'
}

const ball = {
    x: canvasWidth / 2 - 5,
    y: canvasHeight / 2 - 5,
    radius: 10,
    speed: 10,
    color: 'black',
}
gameStart()
function gameStart() {
    createBall()
}

function drawInterface() {
    clearBoard()
    if (paddle.rightPressed && paddle.x >= 0) {
        paddle.x -= paddle.speed
    }
    if (paddle.leftPressed && paddle.x <= canvasWidth - paddle.width) {
        paddle.x += paddle.speed
    }
    drawBall()
    drawPaddle()
    moveBall()
    checkPosBall()
    drawIsland()
    gameLose()
}

window.addEventListener('keydown', moveDown)
window.addEventListener('keyup', moveUp)

function clearBoard() {
    ctx.fillStyle = background
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
}

function drawBall() {
    ctx.fillStyle = ball.color
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true)
    ctx.stroke()
    ctx.fill()
}

function drawPaddle() {
    ctx.fillStyle = paddle.color
    ctx.beginPath()
    ctx.arc(paddle.x + paddle.width - paddle.height / 2,
        paddle.y + paddle.height / 2,
        paddle.height / 2, Math.PI / 2, 3 * Math.PI / 2, true);
    ctx.arc(paddle.x + paddle.height / 2,
        paddle.y + paddle.height / 2,
        paddle.height / 2, 3 * Math.PI / 2, Math.PI / 2, true);
    ctx.lineTo(paddle.x + paddle.width - paddle.height / 2, paddle.y + paddle.height);
    ctx.fill();
    ctx.stroke();
}

function drawIsland() {
    ctx.fillStyle = island.color
    ctx.beginPath()
    ctx.arc(island.x + island.width - island.height / 2,
        island.y + island.height / 2,
        island.height / 2, Math.PI / 2, 3 * Math.PI / 2, true);
    ctx.arc(island.x + island.height / 2,
        island.y + island.height / 2,
        island.height / 2, 3 * Math.PI / 2, Math.PI / 2, true);
    ctx.lineTo(island.x + island.width - island.height / 2, island.y + island.height);
    ctx.fill();
    ctx.stroke();
}

function moveDown(e) {
    const keyPressed = e.keyCode
    if (keyPressed === 68) {
        paddle.leftPressed = true
    }
    if (keyPressed === 65) {
        paddle.rightPressed = true
    }
}

function moveUp(e) {
    const keyPressed = e.keyCode
    if (keyPressed === 68) {
        paddle.leftPressed = false
    }
    if (keyPressed === 65) {
        paddle.rightPressed = false
    }
}

canvas.addEventListener('mousemove', (event) => {
    const x = event.x - event.target.offsetLeft
    paddle.x = x - paddle.width / 2
    drawPaddle()
})

canvas.addEventListener('mousedown', () => {
    canvas.addEventListener('mousemove', (event) => {
        const x = event.x - event.target.offsetLeft
        paddle.x = x - paddle.width / 2
        drawPaddle()
    })
})

function createBall() {
    if (random == 1) {
        ballXDirection = 1
    }
    else if (random == 0) {
        ballXDirection = -1
    }
}

function moveBall() {
    ball.x += ballXDirection * ballSpeed
    ball.y += ballYDirection * ballSpeed
}

function checkPosBall() {
    if (ball.x >= canvasWidth - ball.radius) {
        ballXDirection = -1
    }
    if (ball.x <= 0 + ball.radius) {
        ballXDirection = 1
    }
    if (ball.y >= paddle.y - ball.radius && ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
        ballSpeed += 0.1
        ballYDirection = -1
        console.log(ballSpeed)
    }
    if (ball.y <= 0 + ball.radius) {
        ballYDirection = 1
    }
    if (ball.y <= island.y + island.height + ball.radius
        && ball.x > island.x
        && ball.x < island.x + island.width) {
        ballYDirection = 1
        score.innerText = `Score: ${scoreTxt += 1}`
    }
}

function gameLose() {
    if (ball.y >= canvasHeight) {
        location.reload()
    }
}

setInterval(() => {
    drawInterface()
}, 10)