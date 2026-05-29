import k from "../kLoader"
const grids= [120, 240, 360, 480]

const makeAye = (pos) => {
    const aye =  k.add([
        k.sprite("aye"),
        k.area({
            shape: new Rect(vec2(0), 32, 48),
            scale: 0.8
        }),
        k.pos(pos),
        k.scale(2),
        k.anchor("center"),
        k.body(),
        {
            setControls() {
                k.onButtonPress("up", () => {
                    if (this.pos.y == grids[0]) {
                        return
                    } else {
                        this.pos.y -= 120
                    }
                    
                })
                k.onButtonPress("down", () => {
                    if (this.pos.y == grids[3]) {
                        return
                    } else {
                        this.pos.y += 120
                    }
                })
            }
        }
    ])
    return aye
}

export default makeAye


// 1 = 120
// 2 = 240
// 3 = 360
// 4 = 480