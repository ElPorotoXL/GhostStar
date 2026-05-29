import k from "../kLoader.js"
import makeAye from "../entities/aye.js"
import makeFantasma from "../entities/fantasma.js"
import makeStar from "../entities/star.js"
import makeFantasmaRojo from "../entities/fantasma-rojo.js"
import makeProyectile from "../entities/proyectile.js"
import makeReyFantasma from "../entities/rey-fantasma.js"

const starDmg = 2
export default function game() {
    const bgWidth = 384
    k.add([
        k.sprite("bg1"),
        k.pos(0, 0),
        k.scale(3)
    ])

    const bg2Pieces = [
        k.add([
            k.sprite("bg2"),
            k.pos(0, 0),
            k.scale(3)
        ]),
        k.add([
            k.sprite("bg2"),
            k.pos(bgWidth * 3, 0),
            k.scale(3)
        ])
    ]

        const bg3Pieces = [
        k.add([
            k.sprite("bg3"),
            k.pos(0, 0),
            k.scale(3)
        ]),
        k.add([
            k.sprite("bg3"),
            k.pos(bgWidth * 3, 0),
            k.scale(3)
        ])
    ]

    const grids= [120, 240, 360, 480]
    const aye = makeAye(k.vec2(100, grids[2]))
    aye.setControls()
    const btnUp = k.add([
        k.pos(80, k.height() - 180),
        k.rect(80, 80, { radius: 10 }),
        k.color(150, 150, 150),
        k.area(),
        k.opacity(0.5),
        k.fixed()
    ])
    btnUp.add([
        k.text("↑", { size: 32 }),
        k.anchor("center"),
        k.pos(40, 40)
    ])
    btnUp.onClick(() => {
        k.pressButton("up")
    })
    const btnDown = k.add([
        k.pos(80, k.height() - 90),
        k.rect(80, 80, { radius: 10 }),
        k.color(150, 150, 150),
        k.area(),
        k.opacity(0.5),
        k.fixed()
    ])
    btnDown.add([
        k.text("↓", { size: 32 }),
        k.anchor("center"),
        k.pos(40, 40)
    ])
    btnDown.onClick(() => {
        k.pressButton("down")
    })
    const btnFire = k.add([
        k.pos(980, k.height() - 120),
        k.rect(80, 80, { radius: 10 }),
        k.color(150, 150, 150),
        k.area(),
        k.opacity(0.5),
        k.fixed()
    ])
    btnFire.add([
        k.text("X", { size: 32 }),
        k.anchor("center"),
        k.pos(40, 40)
    ])
    btnFire.onClick(() => {
        k.pressButton("fire")
    })
    aye.onCollide("enemy", () => {
        k.setData("current-score", score)
        k.go("game-over")
    })
    aye.onCollide("proyectile", (proyectile) => {
        k.setData("current-score", score)
        k.go("game-over")
    })

    k.onButtonPress("fire", () => {
        const star = makeStar(k.vec2(100, aye.pos.y))
        k.onUpdate(() => {
            star.move(300, 0)
        })
        star.onExitScreen(() => {
            if (star.pos.x > k.width()) {
                k.destroy(star)
            }
        })
        star.onCollide("enemy", (enemy) => {
            enemy.hp -= starDmg
            k.destroy(star)
        })
    })

    let score = 0

    const scoreText = k.add([
        k.text(`Score: ${score}`, {
            font: "jersey",
            size: 32,
        }),
        k.pos(10, 5),
    ])

    const gameSpeed = 200

    const spawnFantasma = () => {
        let hp = 2
        let rndGrid = k.rand(0, 5)
        if (rndGrid > 0 && rndGrid < 1) {
            rndGrid = grids[0]
        } else if (rndGrid >= 1 && rndGrid < 2) {
            rndGrid = grids[1]
        } else if (rndGrid >= 2 && rndGrid < 3) {
            rndGrid = grids[2]
        } else if (rndGrid >= 3 || rndGrid < 4) {
            rndGrid = grids[3]
        }
        console.log(rndGrid)
        const fantasma = makeFantasma(k.vec2(k.width(), rndGrid))
        fantasma.onUpdate(() => {
            fantasma.move(-gameSpeed, 0)
        })
        fantasma.onExitScreen(() => {
            if (fantasma.pos.x < 0) {
                k.destroy(fantasma)
            }
        })
        fantasma.onCollide("star", () => {
            hp = hp - starDmg
            if (hp <= 0) {
                k.destroy(fantasma)
                score += 50
                scoreText.text = `Score: ${score}`
                let scoreUi = k.add([
                    k.text("+50", { font: "jersey", size: 24 }),
                    k.pos(fantasma.pos.x, fantasma.pos.y - 20),
                    k.color(255, 255, 255),
                    k.anchor("center")
                ])
                k.wait(1, () => {
                    k.destroy(scoreUi)
                })
            }
        })
        const waitTime = k.rand(1.5, 2.5)
        k.wait(waitTime, () => {
            spawnFantasma()
        })
    }
    spawnFantasma()

        const spawnFantasmaRojo = () => {
            let hp = 4
        let rndGrid = k.rand(0, 5)
        if (rndGrid > 0 && rndGrid < 1) {
            rndGrid = grids[0]
        } else if (rndGrid >= 1 && rndGrid < 2) {
            rndGrid = grids[1]
        } else if (rndGrid >= 2 && rndGrid < 3) {
            rndGrid = grids[2]
        } else if (rndGrid >= 3 || rndGrid < 4) {
            rndGrid = grids[3]
        }
        console.log(rndGrid)
        const fantasmaRojo = makeFantasmaRojo(k.vec2(k.width(), rndGrid))
        fantasmaRojo.onUpdate(() => {
            fantasmaRojo.move(-150, 0)
        })
        fantasmaRojo.onDestroy(() => {
            const proyectile = makeProyectile(fantasmaRojo.pos)
            proyectile.onUpdate(() => {
                proyectile.move(-300, 0)
            })
            proyectile.onExitScreen(() => {
                if (proyectile.pos.x < 0) {
                    k.destroy(proyectile)
                }
            })
            proyectile.onCollide("game-over-background", () => {
                k.destroy(proyectile)
            })
        })
        fantasmaRojo.onExitScreen(() => {
            if (fantasmaRojo.pos.x < 0) {
                k.destroy(fantasmaRojo)
            }
        })
        fantasmaRojo.onCollide("star", () => {
            hp = hp - starDmg
            if (hp <= 0) {
                k.destroy(fantasmaRojo)
                score += 100
                scoreText.text = `Score: ${score}`
                let scoreUi = k.add([
                    k.text("+100", { font: "jersey", size: 24 }),
                    k.pos(fantasmaRojo.pos.x, fantasmaRojo.pos.y - 20),
                    k.color(255, 255, 255),
                    k.anchor("center")
                ])
                k.wait(1, () => {
                    k.destroy(scoreUi)
                })
            }
        })
        const waitTime = k.rand(1.5, 4)
        k.wait(waitTime, () => {
            spawnFantasmaRojo()
        })
    }
    spawnFantasmaRojo()

    const spawnReyFantasma = () => {
        let hp = 8
        const reyFantasma = makeReyFantasma(k.vec2(k.width(), k.height() / 2))
        reyFantasma.onUpdate(() => {
            reyFantasma.move(-200, 0)
        })
        reyFantasma.onExitScreen(() => {
            if (reyFantasma.pos.x < 0) {
                k.destroy(reyFantasma)
            }
        })
        reyFantasma.onCollide("star", () => {
            hp = hp - starDmg
            if (hp <= 0) {
                k.destroy(reyFantasma)
                score += 200
                scoreText.text = `Score: ${score}`
                let scoreUi = k.add([
                    k.text("+200", { font: "jersey", size: 24 }),
                    k.pos(reyFantasma.pos.x, reyFantasma.pos.y - 20),
                    k.color(255, 255, 255),
                    k.anchor("center")
                ])
                k.wait(1, () => {
                    k.destroy(scoreUi)
                })
            }
        })
        const waitTime = k.rand(5, 10)
        k.wait(waitTime, () => {
            spawnReyFantasma()
        })
    }
    spawnReyFantasma()

    k.onUpdate(() => {
        if (bg2Pieces[1].pos.x <= 0) {
            bg2Pieces[0].moveTo(bg2Pieces[1].pos.x + bgWidth * 3, 0)
            bg2Pieces.push(bg2Pieces.shift())
        }

        bg2Pieces[0].move(-50, 0)
        bg2Pieces[1].moveTo(bg2Pieces[0].pos.x + bgWidth * 3, 0)
    })

    k.onUpdate(() => {
        if (bg3Pieces[1].pos.x <= 0) {
            bg3Pieces[0].moveTo(bg3Pieces[1].pos.x + bgWidth * 3, 0)
            bg3Pieces.push(bg3Pieces.shift())
        }

        bg3Pieces[0].move(-150, 0)
        bg3Pieces[1].moveTo(bg3Pieces[0].pos.x + bgWidth * 3, 0)
    })
}