class CreditScene extends Phaser.Scene {
    constructor() {
        super({ key: 'creditScene' });
    }

    preload() {
        // Ensure the path is correct for the assets
        this.load.setPath("./assets/");
        this.load.image('border', 'panel-transparent-center-027.png');
        this.load.image('startButton', 'text_go.png');  // Adjust the path as necessary
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
        
        // Display group partners
        this.add.text(this.cameras.main.width / 2, 400, 'Group Partners:\nKaylee Morales\nCeleste Herrera\nHasina Esteqlal\nSamina Esteqlal\n', {
            font: '25px Arial',
            fill: '#AA336A',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(this.cameras.main.width / 2, 550, 'Final Game Project for CMPM 120\nSpring 2024\n', {
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