// function drawBall(ctx, ball) {
//     ctx.fillStyle = ball.color
//     ctx.beginPath()
//     ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true)
//     ctx.stroke()
//     ctx.fill()
// }

// function drawPaddle(ctx, paddle) {
//     ctx.fillStyle = paddle.color
//     ctx.beginPath()
//     ctx.arc(paddle.x + paddle.width - paddle.height / 2,
//         paddle.y + paddle.height / 2,
//         paddle.height / 2, Math.PI / 2, 3 * Math.PI / 2, true);
//     ctx.arc(paddle.x + paddle.height / 2,
//         paddle.y + paddle.height / 2,
//         paddle.height / 2, 3 * Math.PI / 2, Math.PI / 2, true);
//     ctx.lineTo(paddle.x + paddle.width - paddle.height / 2, paddle.y + paddle.height);
//     ctx.fill();
//     ctx.stroke();
// }

// export { drawBall, drawPaddle, }