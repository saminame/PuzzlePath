class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");

        // Load characters spritesheet
        this.load.atlas("platformer_characters", "tilemap-characters-packed.png", "tilemap-characters-packed.json");

        // Load tilemap information
        this.load.image("tilemap_tiles1", "tilemap_packed.png");      
        this.load.image("tilemap_tiles2", "tilemap.png");                   // Packed tilemap
        this.load.tilemapTiledJSON("final", "final.tmj");   // Tilemap in JSON

        this.load.spritesheet("tilemap_sheet", "tilemap_packed.png", {
            frameWidth: 18,
            frameHeight: 18
        });

        this.load.spritesheet("tilemap_sheet2", "tilemap.png", {
            frameWidth: 18.9,
            frameHeight: 19
        });

        // Load sounds
        this.load.audio('doorOpen', 'doorOpen_1.ogg');
        this.load.audio('coinPick', 'jingles_NES09.ogg');
        this.load.audio('restartSound', 'jingles_NES15.ogg');
        this.load.audio('winSound', 'jingles_NES15.ogg');
        this.load.audio('antiFall', 'jingles_NES06.ogg');
        this.load.audio('jumpBoost', 'jingles_NES08.ogg');
    }

    create() {
        if (!this.anims.get('walk')) {
            this.anims.create({
                key: 'walk',
                frames: this.anims.generateFrameNames('platformer_characters', {
                    prefix: "tile_",
                    start: 0,
                    end: 1,
                    suffix: ".png",
                    zeroPad: 4
                }),
                frameRate: 15,
                repeat: -1
            });
        }
        if (!this.anims.get('idle')) {
            this.anims.create({
                key: 'idle',
                defaultTextureKey: "platformer_characters",
                frames: [
                    { frame: "tile_0000.png" }
                ],
                repeat: -1
            });
        }

        if (!this.anims.get('jump')) {
            this.anims.create({
                key: 'jump',
                defaultTextureKey: "platformer_characters",
                frames: [
                    { frame: "tile_0001.png" }
                ],
            });
        }

         // ...and pass to the next Scene
         this.scene.start("platformerScene");
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}
