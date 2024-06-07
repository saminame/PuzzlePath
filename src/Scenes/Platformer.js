class Platformer extends Phaser.Scene {
    constructor() {
        super("platformerScene");
        this.my = {sprite: {}};
    }

    init() {
        // variables and settings
        this.ACCELERATION = 500;
        this.DRAG = 700;    // DRAG < ACCELERATION = icy slide
        this.physics.world.gravity.y = 1500;
        this.JUMP_VELOCITY = -600;
        this.PARTICLE_VELOCITY = 50;
        this.SCALE = 2.0;
        this.PLAYER_VELOCITY = 0;
        this.HEALTH = 3;    
    }

    create() {
        // Create a new tilemap game object which uses 18x18 pixel tiles, and is
        // 80 tiles wide and 50 tiles tall.
        this.map = this.add.tilemap("final", 18, 18, 80, 50);
        this.physics.world.setBounds(0,0,80*18, 50*18);

        // Add a tileset to the map
        // First parameter: name we gave the tileset in Tiled
        // Second parameter: key for the tilesheet (from this.load.image in Load.js)
        this.tileset1 = this.map.addTilesetImage("ground-platforms-1", "tilemap_tiles1");
        this.tileset2 = this.map.addTilesetImage("ground-platforms-2", "tilemap_tiles2");
       
        // Create a layer
        this.groundLayer = this.map.createLayer("Ground-n-Platforms", [this.tileset1, this.tileset2], 0, 0);
        //this.groundLayer.setScale(2.0);

        // Make it collidable
        this.groundLayer.setCollisionByProperty({
            collides: true
        });

        this.coins = this.map.createFromObjects("Coin", {
            name: "Coin",
            key: "tilemap_sheet",
            frame: 151
        });
        this.physics.world.enable(this.coins, Phaser.Physics.Arcade.STATIC_BODY);
        this.coinGroup = this.add.group(this.coins);

        this.keys = this.map.createFromObjects("Key", {
            name: "Key", 
            key: "tilemap_sheet", 
            frame: 27
        });
        this.physics.world.enable(this.keys, Phaser.Physics.Arcade.STATIC_BODY);
        this.keyGroup = this.add.group(this.keys);

        this.locks = this.map.createFromObjects("Lock", {
            name: "Lock", 
            key: "tilemap_sheet", 
            frame: 28
        });
        this.physics.world.enable(this.locks, Phaser.Physics.Arcade.STATIC_BODY);
        this.lockGroup = this.add.group(this.locks);

        this.ropes1 = this.map.createFromObjects("Ropes 1", {
            name: "Ropes", 
            key: "tilemap_sheet", 
            frame: 89
        });
        this.physics.world.enable(this.ropes1, Phaser.Physics.Arcade.STATIC_BODY);
        this.ropes1Group = this.add.group(this.ropes1);

        this.ropes2 = this.map.createFromObjects("Ropes 2", {
            name: "Ropes", 
            key: "tilemap_sheet", 
            frame: 89
        });
        this.physics.world.enable(this.ropes2, Phaser.Physics.Arcade.STATIC_BODY);
        this.ropes2Group = this.add.group(this.ropes2);

        this.ropes3 = this.map.createFromObjects("Ropes 3", {
            name: "Ropes", 
            key: "tilemap_sheet", 
            frame: 89
        });
        this.physics.world.enable(this.ropes3, Phaser.Physics.Arcade.STATIC_BODY);
        this.ropes3Group = this.add.group(this.ropes3);

        this.ropes4 = this.map.createFromObjects("Ropes 4", {
            name: "Ropes", 
            key: "tilemap_sheet", 
            frame: 89
        });
        this.physics.world.enable(this.ropes4, Phaser.Physics.Arcade.STATIC_BODY);
        this.ropes4Group = this.add.group(this.ropes4);

        this.ladders = this.map.createFromObjects("Ladders", {
            name: "Ladders", 
            key: "tilemap_sheet", 
            frame: 71
        });
        this.physics.world.enable(this.ladders, Phaser.Physics.Arcade.STATIC_BODY);
        this.laddersGroup = this.add.group(this.ladders);

        this.antiFall = this.map.createFromObjects("Anti Fall", {
            name: "Anti Fall",
            key: "tilemap_sheet2",
            frame: 87
        });
        this.physics.world.enable(this.antiFall, Phaser.Physics.Arcade.STATIC_BODY);
        this.antiFallGroup = this.add.group(this.antiFall);

        this.jumpBoost = this.map.createFromObjects("Jump Boost", {
            name: "Jump Boost",
            key: "tilemap_sheet2",
            frame: 89
        });
        this.physics.world.enable(this.jumpBoost, Phaser.Physics.Arcade.STATIC_BODY);
        this.jumpBoostGroup = this.add.group(this.jumpBoost);

        this.pipe1 = this.map.createFromObjects("Pipes 1", {
            name: "Pipes",
            key: "tilemap_sheet",
            frame: 134
        });
        this.physics.world.enable(this.pipe1, Phaser.Physics.Arcade.STATIC_BODY);
        this.pipe1Group = this.add.group(this.pipe1);

        this.pipe2 = this.map.createFromObjects("Pipes 2", {
            name: "Pipes",
            key: "tilemap_sheet",
            frame: 95
        });
        this.physics.world.enable(this.pipe2, Phaser.Physics.Arcade.STATIC_BODY);
        this.pipe2Group = this.add.group(this.pipe2);

        this.pipe3 = this.map.createFromObjects("Pipes 3", {
            name: "Pipes",
            key: "tilemap_sheet",
            frame: 95
        });
        this.physics.world.enable(this.pipe3, Phaser.Physics.Arcade.STATIC_BODY);
        this.pipe3Group = this.add.group(this.pipe3);

        this.pipe4 = this.map.createFromObjects("Pipes 4", {
            name: "Pipes",
            key: "tilemap_sheet",
            frame: 95
        });
        this.physics.world.enable(this.pipe4, Phaser.Physics.Arcade.STATIC_BODY);
        this.pipe4Group = this.add.group(this.pipe4);

        this.win = this.map.createFromObjects("Win", {
            name: "Win",
            key: "tilemap_sheet",
            frame: 112
        });
        this.physics.world.enable(this.win, Phaser.Physics.Arcade.STATIC_BODY);
        this.winGroup = this.add.group(this.win);

        let tileSize = 18;  // Size of each tile
        let scaleFactor = this.SCALE;  // Scaling factor
        let tilesUp = 3;  // Number of tiles up from the bottom

        let playerX = tileSize * scaleFactor;  // Position the player 1 tile (scaled) from the left edge
        let playerY = this.map.heightInPixels - (tileSize * scaleFactor * tilesUp);  // Position the player a few tiles up from the bottom

        my.sprite.player = this.physics.add.sprite(playerX, playerY, "platformer_characters", "tile_0000.png").setScale(scaleFactor);
        my.sprite.player.setCollideWorldBounds(true);
        my.sprite.player.setScale(1);
        my.sprite.player.body.checkCollision.up = false;

        // Enable collision handling
        this.physics.add.collider(my.sprite.player, this.groundLayer);

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', () => {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this);

        // add camera code here
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(my.sprite.player, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])
        this.cameras.main.setDeadzone(50, 50);
        this.cameras.main.setZoom(this.SCALE);

        this.physics.world.TILE_BIAS = 24;

    }

    update() {
        if(cursors.left.isDown) {
            // have the player accelerate to the left
            my.sprite.player.body.setAccelerationX(-this.ACCELERATION);
            my.sprite.player.resetFlip();
            my.sprite.player.anims.play('walk', true);

        } else if(cursors.right.isDown) {
            // have the player accelerate to the right
            my.sprite.player.body.setAccelerationX(this.ACCELERATION);
            my.sprite.player.setFlip(true, false);
            my.sprite.player.anims.play('walk', true);

        } else {
            // set acceleration to 0 and have DRAG take over
            my.sprite.player.body.setAccelerationX(0);
            my.sprite.player.body.setDragX(this.DRAG);
            my.sprite.player.anims.play('idle');
        }

        // player jump
        // note that we need body.blocked rather than body.touching b/c the former applies to tilemap tiles and the latter to the "ground"
        if(!my.sprite.player.body.blocked.down) {
            my.sprite.player.anims.play('jump');
        }
        if(my.sprite.player.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            // set a Y velocity to have the player "jump" upwards (negative Y direction)
            my.sprite.player.body.setVelocityY(this.JUMP_VELOCITY);
        }

        // Fall Damage
        if(!my.sprite.player.body.blocked.down){
            this.PLAYER_VELOCITY = my.sprite.player.body.velocity.y;
        }
        if(my.sprite.player.y >= 885){// If player falls to bottom of map
            this.HEALTH -=1;
            this.events.emit('healthTracker');
            my.sprite.player;
        }else if(my.sprite.player.body.blocked.down && this.PLAYER_VELOCITY > 800 && my.sprite.player.y < 888){ // If player falls from tall height
            this.PLAYER_VELOCITY = 0;
            this.HEALTH -=1;
            this.events.emit('healthTracker');
        }
        // If player health reaches 0, restart game
        if(this.HEALTH <= 0){
            this.events.emit('restart');
            this.scene.restart();
        }

    }
}
