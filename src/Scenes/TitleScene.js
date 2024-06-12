class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'titleScene' });
    }

    preload() {
        // Ensure the path is correct for the assets
        this.load.setPath("./assets/");
        this.load.image('startButton', 'text_go.png');
        this.load.image('border', 'panel-transparent-center-027.png');
        this.load.image('button', 'buttonLong_beige.png');
        this.load.audio('buttonClick', 'click4.ogg');
        this.load.audio('buttonHover', 'mouserelease1.ogg');
    }

    create() {
        // Add the title text to the scene
        this.add.image(this.cameras.main.width / 2, 450, 'border').setScale(17);
        this.add.text(this.cameras.main.width / 2, 330, 'Puzzle Path', {
            font: '48px Arial',
            fill: '#9F2B68'
        }).setOrigin(0.5);

        this.buttonSound = this.sound.add('buttonClick', { volume: 0.5 }); // Sound instance for button click
        this.buttonToggle = this.sound.add('buttonHover', { volume: 0.5 }); // Sound instance for button click
        // Display control instructions
        let controlsButton = this.add.image(this.cameras.main.width / 2, 420, 'button').setInteractive();
        this.add.text(this.cameras.main.width / 2, 422, 'CONTROLS', {
            font: '25px Arial',
            fill: '#AA336A',
            align: 'center'
        }).setOrigin(0.5).setInteractive();

        let creditsButton = this.add.image(this.cameras.main.width / 2, 480, 'button').setInteractive();
        let creditsText = this.add.text(this.cameras.main.width / 2, 480, 'CREDITS', {
            font: '25px Arial',
            fill: '#AA336A',
            align: 'center'
        }).setOrigin(0.5).setInteractive();

        // Create the start button
        let startButton = this.add.image(this.cameras.main.width / 2, 550, 'startButton').setInteractive();
        startButton.on('pointerdown', () => {
            // Start the MainScene when the 'startButton' is clicked
            this.buttonSound.play();
            this.scene.start('loadScene');
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

        // Create the controls button
        controlsButton.on('pointerdown', () => {
            // Start the MainScene when the 'controlsButton' is clicked
            this.buttonSound.play();
            this.scene.start('controlsScene');
        });

        // Center the button
        controlsButton.setOrigin(0.5);

        // Optional: Add some hover effects to indicate interactivity
        controlsButton.on('pointerover', () => {
            this.buttonToggle.play();
            controlsButton.setScale(1.1);  // Scale up when hovered
        });

        controlsButton.on('pointerout', () => {
            this.buttonToggle.play();
            controlsButton.setScale(1);  // Scale down when not hovered
        });

        // Create the credits button
        creditsButton.on('pointerdown', () => {
            // Start the MainScene when the 'creditsButton' is clicked
            this.buttonSound.play();
            this.scene.start('creditScene');
        });

        // Center the button
        creditsButton.setOrigin(0.5);

        // Optional: Add some hover effects to indicate interactivity
        creditsButton.on('pointerover', () => {
            this.buttonToggle.play();
            creditsButton.setScale(1.1);  // Scale up when hovered
        });

        creditsButton.on('pointerout', () => {
            this.buttonToggle.play();
            creditsButton.setScale(1);  // Scale down when not hovered
        });
    }
}