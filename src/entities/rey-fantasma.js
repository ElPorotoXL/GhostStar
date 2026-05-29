import k from "../kLoader"

export default function makeReyFantasma(pos) {
    return k.add([
        k.sprite("rey-fantasma"),
        k.pos(pos),
        k.scale(5),
        k.anchor("center"),
        k.area({
            shape: new k.Rect(k.vec2(0), 16, 64),
            scale: 0.5
        }),
        k.offscreen(),
        "enemy",
    ])
}