import kaplay from "kaplay";

const scale = 3;

const k = kaplay({
    width: 384 * scale,
    height: 216 * scale,
    letterbox: true,
    background: [0, 0, 0],
    buttons: {
        up: {
            keyboard: ["up"]
        },
        down: {
            keyboard: ["down"]
        },
        fire: {
            keyboard: ["z", "space"],
        },
        start: {
            mouse: ["left"]
        }
    },
    debugKey: "d",
    debug: true
})

export default k
