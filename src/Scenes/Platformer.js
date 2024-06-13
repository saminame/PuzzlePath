class Platformer extends Phaser.Scene {
    constructor() {
        super("platformerScene");
        this.my = {sprite: {}};
        this.onLadder = false;
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
        this.HEALTH = 5;
        this.COOLDOWN = 0;
        this.playerX;
        this.playerY;
        this.npc1X = 290;
        this.npc1Y = 835;
        this.npc2X = 290;
        this.npc2Y = 295;
        this.npc3X = 910;
        this.npc3Y = 385;
        this.KEY = false;
        this.COINS = 0;
        this.DIAMONDS = 0;
        this.CHECK = false;
        this.PIPE2 = false;
        this.PIPE1 = false;    
    }

    preload() {
        // Ensure the path is correct for the assets
        this.load.setPath("./assets/");
        this.load.audio('buttonClick', 'click4.ogg');
    }

    create() {
        this.doorOpenSound = this.sound.add('doorOpen', { volume: 0.5 }); // Sound instance for door opening
        this.coinPickSound = this.sound.add('coinPick', { volume: 0.5 });
        this.restartSound = this.sound.add('restartSound', { volume: 0.5 });
        this.antiFallSound = this.sound.add('antiFall', { volume: 0.5 });
        this.jumpBoostSound = this.sound.add('jumpBoost', { volume: 0.5 });
        this.winSound = this.sound.add('winSound', { volume: 0.5 });
        this.hintToggle = this.sound.add('buttonClick', { volume: 0.5 });
        
        // Create a new tilemap game object which uses 18x18 pixel tiles, and is 80 tiles wide and 50 tiles tall.
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

        this.diamonds = this.map.createFromObjects("Diamonds", {
            name: "Diamonds",
            key: "tilemap_sheet",
            frame: 67
        });
        this.physics.world.enable(this.diamonds, Phaser.Physics.Arcade.STATIC_BODY);
        this.diamondGroup = this.add.group(this.diamonds);

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

        this.ropes5 = this.map.createFromObjects("Ropes 5", {
            name: "Ropes", 
            key: "tilemap_sheet", 
            frame: 89
        });
        this.physics.world.enable(this.ropes5, Phaser.Physics.Arcade.STATIC_BODY);
        this.ropes5Group = this.add.group(this.ropes5);

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

        this.debuff = this.map.createFromObjects("Debuff", {
            name: "Debuff",
            key: "tilemap_sheet2",
            frame: 83
        });
        this.physics.world.enable(this.debuff, Phaser.Physics.Arcade.STATIC_BODY);
        this.debuffGroup = this.add.group(this.debuff);

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

        let tileSize = 18;              // Size of each tile
        let scaleFactor = this.SCALE;   // Scaling factor
        let tilesUp = 3;                // Number of tiles up from the bottom

        this.playerX = tileSize * scaleFactor;  // Position the player 1 tile (scaled) from the left edge
        this.playerY = this.map.heightInPixels - (tileSize * scaleFactor * tilesUp);  // Position the player a few tiles up from the bottom

        my.sprite.player = this.physics.add.sprite(this.playerX, this.playerY, "platformer_characters", "tile_0000.png").setScale(scaleFactor);
        my.sprite.player.setCollideWorldBounds(true);
        my.sprite.player.setScale(1);

        my.sprite.npc1 = this.physics.add.sprite(this.npc1X, this.npc1Y, "platformer_characters", "tile_0004.png").setScale(scaleFactor);
        this.setNPC(my.sprite.npc1);
        let hintText1 = this.add.text(this.npc1X - 30, this.npc1Y - 30, "Click me for a hint hehe!", { fontSize: '10px', fill: '#fff' });
        my.sprite.npc1.on('pointerdown', function (pointer) {
            this.hintToggle.play();
            hintText1.visible = false;
            const hint1 = this.add.text(this.npc1X - 80, this.npc1Y - 250, "You need to use the key to unlock the rope!", { fontSize: '16px', fill: '#fff' });
        }, this);

        my.sprite.npc2 = this.physics.add.sprite(this.npc2X, this.npc2Y, "platformer_characters", "tile_0004.png").setScale(scaleFactor);
        this.setNPC(my.sprite.npc2);
        let hintText2 = this.add.text(this.npc2X - 100, this.npc2Y - 30, "Click me for a hint hehe!", { fontSize: '10px', fill: '#fff' });
        my.sprite.npc2.on('pointerdown', function (pointer) {
            this.hintToggle.play();
            hintText2.visible = false;
            const hint2 = this.add.text(this.npc2X - 250, this.npc2Y - 50, "You need to collect ALL the coins! I wonder where these pipes go...", { fontSize: '16px', fill: '#fff' });
        }, this);

        my.sprite.npc3 = this.physics.add.sprite(this.npc3X, this.npc3Y, "platformer_characters", "tile_0004.png").setScale(scaleFactor);
        this.setNPC(my.sprite.npc3);
        let hintText3 = this.add.text(this.npc3X - 100, this.npc3Y - 20, "Click me for a hint hehe!", { fontSize: '10px', fill: '#fff' });
        my.sprite.npc3.on('pointerdown', function (pointer) {
            this.hintToggle.play();
            hintText3.visible = false;
            const hint3 = this.add.text(this.npc3X + 50, this.npc3Y - 70, "You need to collect ALL\nthe coins and diamonds!", { fontSize: '16px', fill: '#fff' });
        }, this);

        // Enable collision handling
        this.physics.add.collider(my.sprite.player, this.groundLayer);
        this.physics.add.collider(my.sprite.npc1, this.groundLayer);
        this.physics.add.collider(my.sprite.npc2, this.groundLayer);
        this.physics.add.collider(my.sprite.npc3, this.groundLayer);

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        // debug
        this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true;
        this.physics.world.debugGraphic.clear();

        // add camera code here
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(my.sprite.player, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])
        this.cameras.main.setDeadzone(50, 50);
        this.cameras.main.setZoom(this.SCALE);

        // ladder collision 
        this.physics.add.overlap(my.sprite.player, this.laddersGroup, this.onLadderEnter, null, this);

        this.physics.world.TILE_BIAS = 24;

        // Collect coins
        this.physics.add.overlap(my.sprite.player, this.coinGroup, (obj1, obj2) => {
            obj2.destroy(); // remove coin on overlap
            this.coinPickSound.play(); // Play the sound when the coin is picked
            this.COINS ++;
            this.events.emit('ScoreTracker');
            if(this.COINS == 7){
                // remove rope
                this.ropes2Group.children.each(function(obj) {
                    obj.destroy();
                    this.doorOpenSound.play(); // play the door sound
                }, this);
            }
            if(this.COINS == 32){
                // remove rope
                this.ropes4Group.children.each(function(obj) {
                    obj.destroy();
                    this.doorOpenSound.play(); // play the door sound
                }, this);
            }
            //check if coin collected after pipe
            if(this.PIPE2 == true){
                this.PIPE1 = true;
            }
            

        });

        // Add overlap check for diamonds
        this.physics.add.overlap(my.sprite.player, this.diamondGroup, (obj1, obj2) => {
            obj2.destroy(); // Remove diamond on overlap
            this.coinPickSound.play(); // Play the same sound or a different one if you have a diamond sound
            this.DIAMONDS ++;
            this.events.emit('DiamondTracker'); // You can create a new event for diamond tracking if needed
            
            // Check if 4 diamonds are collected to remove rope4
            if (this.DIAMONDS == 4) {
                this.ropes5Group.children.each(function(obj) {
                    obj.destroy();
                    this.doorOpenSound.play(); // play the door sound
                }, this);
            }
        });
            
        // Collect key
        this.physics.add.overlap(my.sprite.player, this.keyGroup, (obj1, obj2) => {
            obj2.destroy(); // remove key on overlap
            this.KEY = true;
            this.events.emit('KeyTracker');

        });

        this.physics.add.overlap(my.sprite.player, this.lockGroup, (obj1, obj2) => {
            if(this.KEY == true){
                // remove rope
                this.ropes3Group.children.each(function(obj) {
                    obj.destroy();
                    this.doorOpenSound.play(); // Play the sound
                }, this);
                my.sprite.player.body.checkCollision.up = false;

            }            
        });

        // collision with pipes

        // second puzzle pipes
        this.physics.add.overlap(my.sprite.player, this.pipe2Group, (obj1, obj2) => {
            this.pipe1Group.children.each(function(obj) {
                my.sprite.player.x = obj.x + 20;
                my.sprite.player.y = obj.y;
            }, this);
            this.playerStop(my.sprite.player);
            this.PIPE2 = true;              
        });

        this.physics.add.overlap(my.sprite.player, this.pipe1Group, (obj1, obj2) => {
            if(this.PIPE1 == true){ //after coin is collected
                this.pipe2Group.children.each(function(obj) {
                    my.sprite.player.x = obj.x + 30;
                    my.sprite.player.y = obj.y;
                }, this);
                this.playerStop(my.sprite.player);
            }              
        });

        //other pipes
        this.physics.add.overlap(my.sprite.player, this.pipe3Group, (obj1, obj2) => {
            this.pipe4Group.children.each(function(obj) {
                my.sprite.player.x = obj.x + 30;
                my.sprite.player.y = obj.y;
            }, this);
            this.playerStop(my.sprite.player);
        });

        this.physics.add.overlap(my.sprite.player, this.pipe4Group, (obj1, obj2) => {
            this.pipe3Group.children.each(function(obj) {
                my.sprite.player.x = obj.x - 30;
                my.sprite.player.y = obj.y;
            }, this);  
            this.playerStop(my.sprite.player);          
        });

        // Make ropes collidable
        this.ropes1Group.children.each(function(obj) {
            this.physics.add.collider(my.sprite.player, obj);
        }, this);
        this.ropes2Group.children.each(function(obj) {
            this.physics.add.collider(my.sprite.player, obj);
        }, this);
        this.ropes3Group.children.each(function(obj) {
            this.physics.add.collider(my.sprite.player, obj);
        }, this);
        this.ropes4Group.children.each(function(obj) {
            this.physics.add.collider(my.sprite.player, obj);
        }, this);
        this.ropes5Group.children.each(function(obj) {
            this.physics.add.collider(my.sprite.player, obj);
        }, this);

        //Jump Boost
        this.physics.add.overlap(my.sprite.player, this.jumpBoostGroup, (obj1, obj2) => {
            this.JUMP_VELOCITY = -1100;
            obj2.destroy();
            this.jumpBoostSound.play(); // Correct 'this' usage
        });

        //Anti Fall
        this.physics.add.overlap(my.sprite.player, this.antiFallGroup, (obj1, obj2) => {
            this.physics.world.gravity.y = 1000;
            my.sprite.player.body.setGravityY(1000); // Disable gravity for the player
            obj2.destroy();
            this.antiFallSound.play(); // Correct 'this' usage
        });

        //Debuff - resets the character's special abilities
        this.physics.add.overlap(my.sprite.player, this.debuffGroup, (obj1, obj2) => {
            this.physics.world.gravity.y = 1500;
            my.sprite.player.body.setGravityY(1500); // Disable gravity for the player
            this.JUMP_VELOCITY = -600;
            obj2.destroy();
            this.jumpBoostSound.play(); // Correct 'this' usage
        });

        // Win objective
        this.physics.add.overlap(my.sprite.player, this.winGroup, (obj1, obj2) => {
            this.winSound.play(); // Play the win sound
            this.events.emit('restart');
            this.events.emit('restartScore');
            this.scene.start("EndScene");
        });

        // Health and Score  
        this.events.emit('load');
        this.events.emit('loadScore');
    }

    
    setNPC(npc){
        npc.setCollideWorldBounds(true);
        npc.setScale(1);
        npc.setInteractive();
        npc.body.setVelocity(0);
        npc.body.setAllowGravity(false); // Disable gravity initially
    }

    playerStop(player){
        player.body.setVelocityY(0);
        player.body.setVelocityX(0);
        player.body.setAccelerationX(0);
    }

    onLadderEnter(player, ladder) {
        this.onLadder = true;
        player.body.setGravityY(0); // Disable gravity for the player
        player.body.setVelocityY(0); // Stop any vertical movement when initially touching the ladder
    }

    update() {
        if (this.onLadder) {
            this.CHECK = true;
            if (cursors.up.isDown) {
                my.sprite.player.body.setVelocityY(-this.ACCELERATION / 2); // Move up
            } else if (cursors.down.isDown) {
                my.sprite.player.body.setVelocityY(this.ACCELERATION / 2); // Move down
            } else {
                my.sprite.player.body.setVelocityY(0); // Stop moving if no key is pressed
            }
    
            // Allow horizontal movement while on ladder if needed
            if (cursors.left.isDown) {
                my.sprite.player.body.setVelocityX(-this.ACCELERATION / 2);
                my.sprite.player.resetFlip();
            } else if (cursors.right.isDown) {
                my.sprite.player.body.setVelocityX(this.ACCELERATION / 2);
                my.sprite.player.setFlip(true, false);
            } else {
                my.sprite.player.body.setVelocityX(0); // Stop horizontal movement if no key is pressed
            }
        } else { 
            if(this.CHECK == true){ // reset velocity after getting off ladder
                this.CHECK = false;
                my.sprite.player.body.setVelocityY(0);
                my.sprite.player.body.setVelocityX(0);
                if(this.JUMP_VELOCITY > -1000){
                    this.JUMP_VELOCITY = -900;
                }else if(this.JUMP_VELOCITY == -1100){
                    this.JUMP_VELCITY = -600
                }
            }   
            if (cursors.left.isDown) {
                my.sprite.player.body.setAccelerationX(-this.ACCELERATION);
                my.sprite.player.resetFlip();
                my.sprite.player.anims.play('walk', true);
    
            } else if (cursors.right.isDown) {
                my.sprite.player.body.setAccelerationX(this.ACCELERATION);
                my.sprite.player.setFlip(true, false);
                my.sprite.player.anims.play('walk', true);
    
            } else {
                my.sprite.player.body.setAccelerationX(0);
                my.sprite.player.body.setDragX(this.DRAG);
                my.sprite.player.anims.play('idle');
            }
    
            if (!my.sprite.player.body.blocked.down) {
                my.sprite.player.anims.play('jump');
            }

            if (my.sprite.player.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
                my.sprite.player.body.setVelocityY(this.JUMP_VELOCITY);
            }
    
            // Fall Damage
            if(!my.sprite.player.body.blocked.down){
                this.PLAYER_VELOCITY = my.sprite.player.body.velocity.y;
            }
            if(this.COOLDOWN !=0){
                this.COOLDOWN ++;
            }else if(this.COOLDOWN == 10){
                this.COOLDOWN = 0;
            }

            if(my.sprite.player.y >= 885){// If player falls to bottom of map
                this.HEALTH -=1;
                this.events.emit('healthTracker');
                my.sprite.player.y = this.playerY;
                my.sprite.player.x = this.playerX;
                this.COOLDOWN = 1;
            }else if(my.sprite.player.body.blocked.down && this.PLAYER_VELOCITY > 800 && this.COOLDOWN == 0){ // If player falls from tall height
                this.PLAYER_VELOCITY = 0;
                this.HEALTH -=1;
                this.events.emit('healthTracker');
                this.COOLDOWN = 1;
            }

            // If player health reaches 0, restart game
            if(this.HEALTH <= 0){
                this.restartSound.play(); // Play the restart sound
                this.events.emit('restart');
                this.events.emit('restartScore');
                this.scene.start("RestartScene");
            }
        }
    
        // Reset ladder state when leaving the ladder
        if (!this.physics.overlap(my.sprite.player, this.laddersGroup)) {
            if (this.onLadder) {
                this.onLadder = false;
                my.sprite.player.body.setGravityY(this.physics.world.gravity.y); // Re-enable gravity
            }
        }
    }
}
