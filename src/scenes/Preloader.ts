import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
    constructor() {
        super("preloader");
    }

    preload() {
        this.load.image("tiles", "tiles/tavern_tiles.png");
        this.load.tilemapTiledJSON("tavern", "tiles/tavern01.json");

        this.load.atlas(
            "knight",
            "characters/knight.png",
            "characters/knight.json"
        );
    }

    create() {
        this.scene.start("game");
    }
}
