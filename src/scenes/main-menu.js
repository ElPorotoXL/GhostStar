import k from "../kLoader.js";
import aye from "../entities/aye.js";

export function mainMenu() {
    if (!k.getData("highScore")) {
        k.setData("highScore", 0);
    }
    k.onButtonPress("start", () => {
        k.go("game");
    });
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
    
    k.add([
        k.text("STARGHOST", {
            font: "jersey",
            size: 64,
        }),
        k.pos(k.center().x, 200),
        k.anchor("center")
    ])

        k.add([
        k.text("press SPACE or TOUCH to start", {
            font: "jersey",
            size: 32,
        }),
        k.pos(k.center().x, 250),
        k.anchor("center")
    ])

    aye(k.vec2(100, k.center().y))

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
