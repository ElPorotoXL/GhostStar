import k from "../kLoader.js"

const makeFantasma = (pos) => {
    const fantasma = k.add([
        k.sprite("fantasma"),
        k.pos(pos),
        k.area({
            shape: new k.Rect(k.vec2(0), 16, 16),
            scale: 0.5
        }),
        k.scale(2.5),
        k.anchor("center"),
        k.offscreen(),
        "enemy"
    ])

//     fantasma.scoreUI = fantasma.add([
//         k.text("", { font: "jersey", size: 12 }),
//         k.pos(0, -20),
//         k.color(255, 255, 255),
//         k.anchor("center")
//     ])

    return fantasma
}

export default makeFantasma
