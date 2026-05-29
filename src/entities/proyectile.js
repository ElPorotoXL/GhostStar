import k from "../kLoader"

export default function makeProyectile(pos) {
    return k.add([
        k.sprite("proyectile"),
        k.pos(pos),
        k.area({
            shape: new k.Rect(k.vec2(0), 8, 8),
            scale: 0.5
        }),
        k.scale(3),
        k.offscreen(),
        "proyectile",
    ])
}