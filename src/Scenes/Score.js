class Score extends Phaser.Scene{
    constructor ()
    {
        super({ key: 'scoreScene', active: true });

    }
    init(){
        this.SCORE = 0;
        this.DIAMONDS = 0;
    }

    create(){
        const scoreText = this.add.text(250, 10, '', { font: '48px Arial', fill: '#ffffff' });
        const diamondText = this.add.text(250, 50, '', { font: '48px Arial', fill: '#ffffff' });
        const keyText = this.add.text(500, 10, '', { font: '48px Arial', fill: '#ffffff' });
        const ourGame = this.scene.get('platformerScene');

        ourGame.events.on('ScoreTracker', function ()
        {
            this.SCORE += 1;
            scoreText.setText(`Score: ${this.SCORE}`);

        }, this);
        ourGame.events.on('DiamondTracker', function ()
        {
            this.DIAMONDS += 1;
            diamondText.setText(`Diamonds: ${this.DIAMONDS}`);

        }, this);
        ourGame.events.on('KeyTracker', function ()
        {
            keyText.setText(`{Key Collected}`);

        }, this);
        ourGame.events.on('restartScore', function ()
        {
            scoreText.setText("");
            diamondText.setText("");
            keyText.setText("");


        }, this);
        ourGame.events.on('loadScore', function ()
        {
            this.SCORE = 0;
            scoreText.setText("Score: 0");
            diamondText.setText("Diamonds: 0");
            keyText.setText("");

        }, this);
    }

}