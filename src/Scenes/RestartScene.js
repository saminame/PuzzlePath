class RestartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'RestartScene' });
    }

    preload() {
        // Ensure the path is correct for the assets
        //this.load.image('startButton', 'assets/text_go.png');  // Adjust the path as necessary
    }

    create() {
        this.add.text(this.cameras.main.width / 2, 150, 'Game Over', {
            font: '140px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Create the restart button
        const restartButton = this.add.text(this.cameras.main.width / 2, 300, 'Restart', {
            font: '70px Arial',
            color: '#ffffff',
        }).setOrigin(0.5);
        restartButton.setInteractive({ useHandCursor: true });

        restartButton.on('pointerdown', () => {
            // Start the MainScene when the 'startButton' is clicked
            this.scene.start('loadScene');
        });

        // Center the button
        restartButton.setOrigin(0.5);

        // Optional: Add some hover effects to indicate interactivity
        restartButton.on('pointerover', () => {
            restartButton.setScale(1.1);  // Scale up when hovered
        });

        restartButton.on('pointerout', () => {
            restartButton.setScale(1);  // Scale down when not hovered
        });
    }
}