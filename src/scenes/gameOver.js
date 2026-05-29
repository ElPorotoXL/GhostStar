import k from "../kLoader"

export default function gameOver() {
    k.add([
        k.rect(k.width(), k.height()),
        k.color(0, 0, 0),
        k.opacity(0.5),
        k.scale(1),
        k.area(),
        "game-over-background"
    ])
    let highScore = k.getData("highScore")
    const currentScore = k.getData("current-score")

    const rankGrades = ["F", "E", "D", "C", "B", "A", "S"]
    const rankValues = [0, 500, 1000, 1500, 2000, 2500, 4000]
    
    let currentRank = "F"
    let bestRank = "F"

    for (let i = 0; i < rankValues.length; i++) {
        if (currentScore >= rankValues[i]) {
            currentRank = rankGrades[i]
        }
        if (highScore >= rankValues[i]) {
            bestRank = rankGrades[i]
        }
    }
    if (highScore < currentScore) {
        k.setData("highScore", currentScore)
        highScore = currentScore
        bestRank = currentRank
    }

    k.add([
        k.text("GAME OVER", { font: "jersey", size: 90}),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y - 250)
    ])
    k.add([
        k.text(`BEST SCORE : ${highScore}`, {font: "jersey", size: 40}),
        k.anchor("center"),
        k.pos(k.center().x - 400, k.center().y - 180)
    ])
    k.add([ 
        k.text(`CURRENT SCORE : ${currentScore}`, {font: "jersey", size: 40}),
        k.anchor("center"),
        k.pos(k.center().x + 400, k.center().y - 180)
    ])
    const bestRankBox = k.add([
        k.rect(220, 220, {radius: 4}),
        k.anchor("center"),
        k.color(0, 0, 0),
        k.area(),
        k.outline(6, k.Color.fromArray([255, 255, 255])),
        k.pos(k.center().x - 400, k.center().y - 10)
    ])
    bestRankBox.add([
        k.text(bestRank, {font: "jersey", size: 80}),
        k.anchor("center"),
    ])
    const currentRankBox = k.add([
        k.rect(220, 220, {radius: 4}),
        k.anchor("center"),
        k.color(0, 0, 0),
        k.area(),
        k.outline(6, k.Color.fromArray([255, 255, 255])),
        k.pos(k.center().x + 400, k.center().y - 10)
    ])
    currentRankBox.add([
        k.text(currentRank, {font: "jersey", size: 80}),
        k.anchor("center"),
    ])
    k.add([
        k.text("Press Click or Touch to restart", {font: "jersey", size: 48}),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y + 350)
    ])
    k.onButtonPress("start", () => {
            k.go("game")
        })
}
