import Phaser from "phaser";
import { debugDraw } from "../utils/debug";

export default class Game extends Phaser.Scene {
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private knight!: Phaser.Physics.Arcade.Sprite;

    constructor() {
        super("game");
    }

    preload() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        const map = this.make.tilemap({ key: "tavern" });
        const tileset = map.addTilesetImage("base", "tiles", 16, 16);

        map.createLayer("Ground", tileset);
        const wallsLayer = map.createLayer("Walls", tileset);

        wallsLayer.setCollisionByProperty({ collides: true });

        // debugDraw(wallsLayer, this);

        this.knight = this.physics.add.sprite(
            128,
            128,
            "knight",
            "walk-down-1.png"
        );

        this.anims.create({
            key: "knight-idle-down",
            frames: [{ key: "knight", frame: "walk-down-1.png" }],
        });

        this.anims.create({
            key: "knight-idle-up",
            frames: [{ key: "knight", frame: "walk-up-1.png" }],
        });

        this.anims.create({
            key: "knight-idle-side",
            frames: [{ key: "knight", frame: "walk-right-1.png" }],
        });

        this.anims.create({
            key: "knight-walk-down",
            frames: this.anims.generateFrameNames("knight", {
                start: 1,
                end: 9,
                prefix: "walk-down-",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 15,
        });

        this.anims.create({
            key: "knight-walk-up",
            frames: this.anims.generateFrameNames("knight", {
                start: 2,
                end: 9,
                prefix: "walk-up-",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 15,
        });

        this.anims.create({
            key: "knight-walk-side",
            frames: this.anims.generateFrameNames("knight", {
                start: 1,
                end: 9,
                prefix: "walk-right-",
                suffix: ".png",
            }),
            repeat: -1,
            frameRate: 15,
        });

        this.knight.anims.play("knight-idle-down");

        this.physics.add.collider(this.knight, wallsLayer);

        this.cameras.main.startFollow(this.knight, true);
    }

    update(t: number, dt: number) {
        if (!this.cursors || !this.knight) {
            return;
        }

        const speed = 100;
        if (this.cursors.left?.isDown) {
            this.knight.anims.play("knight-walk-side", true);
            this.knight.setVelocity(-speed, 0);

            this.knight.scaleX = -1;
            this.knight.body.offset.x = 45;
        } else if (this.cursors.right?.isDown) {
            this.knight.anims.play("knight-walk-side", true);
            this.knight.setVelocity(speed, 0);

            this.knight.scaleX = 1;
            this.knight.body.offset.x = -20;
        } else if (this.cursors.up?.isDown) {
            this.knight.anims.play("knight-walk-up", true);
            this.knight.setVelocity(0, -speed);
            this.knight.body.offset.y = 15;
        } else if (this.cursors.down?.isDown) {
            this.knight.anims.play("knight-walk-down", true);
            this.knight.setVelocity(0, speed);
            this.knight.body.offset.y = 0;
        } else {
            const parts = this.knight.anims.currentAnim.key.split("-");
            parts[1] = "idle";
            this.knight.play(parts.join("-"));

            this.knight.setVelocity(0, 0);
        }
    }
}
