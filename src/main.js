import k from "./kLoader.js";
import game from "./scenes/game.js";
import gameOver from "./scenes/gameOver.js";
import { mainMenu } from "./scenes/main-menu.js";


k.loadSprite("bg1", "sprites/bg1.png")
k.loadSprite("bg2", "sprites/bg2.png")
k.loadSprite("bg3", "sprites/bg3.png")

k.loadSprite("aye", "sprites/aye.png")
k.loadSprite("fantasma", "sprites/fantasmaa.png")
k.loadSprite("fantasma-rojo", "sprites/fantasma-rojo.png")
k.loadSprite("rey-fantasma", "sprites/rey-fantasma.png")
k.loadSprite("coin", "sprites/coin.png")
k.loadSprite("star", "sprites/star.png")
k.loadSprite("proyectile", "sprites/proyectile.png")
k.loadFont("jersey", "fonts/jersey.ttf")

k.scene("game", game)

k.scene("game-over", gameOver)

k.scene("main-menu", mainMenu)
k.go("main-menu")