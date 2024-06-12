class Controls extends Phaser.Scene {
    constructor() {
        super({ key: 'controlsScene' });
    }

    preload() {
        // Ensure the path is correct for the assets
        this.load.setPath("./assets/");
        this.load.image('up', 'tile_0438.png');
        this.load.image('down', 'tile_0440.png');
        this.load.image('left', 'tile_0441.png');
        this.load.image('right', 'tile_0439.png');
        this.load.image('border', 'panel-transparent-center-027.png');
        this.load.audio('buttonClick', 'click4.ogg');
        this.load.audio('buttonHover', 'mouserelease1.ogg');
    }

    create() {
        // Add the title text to the scene
        this.add.image(this.cameras.main.width / 2, 450, 'border').setScale(17);
        this.add.text(this.cameras.main.width / 2, 250, 'CREDITS', {
            font: '48px Arial',
            fill: '#9F2B68'
        }).setOrigin(0.5);
        
        this.buttonSound = this.sound.add('buttonClick', { volume: 0.5 });
        this.buttonToggle = this.sound.add('buttonHover', { volume: 0.5 }); // Sound instance for button click
        
        // Display control instructions
        this.add.text(this.cameras.main.width / 2, 300, '\n\n\nControls:\nArrow Keys to move and jump\n', {
            font: '25px Arial',
            fill: '#AA336A',
            align: 'center'
        }).setOrigin(0.5);

        this.add.image(840, 530, 'right').setScale(3);
        this.add.text(900, 530, 'Right', {
            font: '25px Arial',
            fill: '#AA336A',
            align: 'center'
        }).setOrigin(0.5);

        this.add.image(600, 530, 'left').setScale(3);
        this.add.text(550, 530, 'Left', {
            font: '25px Arial',
            fill: '#AA336A',
            align: 'center'
        }).setOrigin(0.5);

        this.add.image(this.cameras.main.width / 2, 470, 'up').setScale(3);
        this.add.text(this.cameras.main.width / 2, 430, 'Jump/Climb Up', {
            font: '25px Arial',
            fill: '#AA336A',
            align: 'center'
        }).setOrigin(0.5);

        this.add.image(this.cameras.main.width / 2, 530, 'down').setScale(3);
        this.add.text(this.cameras.main.width / 2, 580, 'Climb Down', {
            font: '25px Arial',
            fill: '#AA336A',
            align: 'center'
        }).setOrigin(0.5);

        
        // Create the start button
        let startButton = this.add.image(this.cameras.main.width / 2, 700, 'startButton').setInteractive();
        startButton.on('pointerdown', () => {
            // Start the MainScene when the 'startButton' is clicked
            this.buttonSound.play();
            this.scene.start('titleScene');
        });

        // Center the button
        startButton.setOrigin(0.5);

        // Optional: Add some hover effects to indicate interactivity
        startButton.on('pointerover', () => {
            this.buttonToggle.play();
            startButton.setScale(1.1);  // Scale up when hovered
        });

        startButton.on('pointerout', () => {
            this.buttonToggle.play();
            startButton.setScale(1);  // Scale down when not hovered
        });
    }
}