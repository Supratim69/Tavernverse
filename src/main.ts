import Phaser from "phaser";
import Preloader from "./scenes/Preloader";
import Game from "./scenes/Game";

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 700,
    height: 700,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: true,
        },
    },
    scene: [Preloader, Game],
});
