import k from "../kLoader"

export default function makeFantasmaRojo(pos) {
    return k.add([
        k.sprite("fantasma-rojo"),
        k.pos(pos),
        k.area({
            shape: new k.Rect(k.vec2(0), 8, 16),
            scale: 0.5
        }),
        k.scale(3),
        k.offscreen(),
        k.anchor("center"),
        "enemy",
    ])
}