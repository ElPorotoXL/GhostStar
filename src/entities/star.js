import k from "../kLoader"

const makeStar = (pos) => {
    const star = k.add([
        k.sprite("star"),
        k.pos(pos),
        k.anchor("center"),
        k.area(),
        k.offscreen(),
        "star"
    ])
    return star
}

export default makeStar