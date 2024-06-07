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
        // 45 tiles wide and 25 tiles tall.
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

        // set up player avatar
        my.sprite.player = this.physics.add.sprite(450, 200, "platformer_characters", "tile_0000.png").setScale(SCALE)
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

        // TODO: add camera code here
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(my.sprite.player, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])
        this.cameras.main.setDeadzone(50, 50);
        this.cameras.main.setZoom(this.SCALE);

        this.physics.world.TILE_BIAS = 24;

    }

    update() {
        if(cursors.left.isDown) {
            // TODO: have the player accelerate to the left
            my.sprite.player.body.setAccelerationX(-this.ACCELERATION);
            my.sprite.player.resetFlip();
            my.sprite.player.anims.play('walk', true);

        } else if(cursors.right.isDown) {
            // TODO: have the player accelerate to the right
            my.sprite.player.body.setAccelerationX(this.ACCELERATION);
            my.sprite.player.setFlip(true, false);
            my.sprite.player.anims.play('walk', true);

        } else {
            // TODO: set acceleration to 0 and have DRAG take over
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
            // TODO: set a Y velocity to have the player "jump" upwards (negative Y direction)
            my.sprite.player.body.setVelocityY(this.JUMP_VELOCITY);
        }

        // Fall Damage
        if(!my.sprite.player.body.blocked.down){
            this.PLAYER_VELOCITY = my.sprite.player.body.velocity.y;
        }
        if(my.sprite.player.y >= 885){// If player falls to bottom of map
            this.HEALTH -=1;
            this.events.emit('healthTracker');
            my.sprite.player.y = 200;
            my.sprite.player.x = 450;
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