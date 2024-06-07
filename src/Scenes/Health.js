class Health extends Phaser.Scene{
    constructor ()
    {
        super({ key: 'healthSceme', active: true });

    }
    init(){
        this.HEALTH = 3;
    }

    create(){
        const healthText = this.add.text(10, 10, 'Health: 3', { font: '48px Arial', fill: '#ffffff' });
        const ourGame = this.scene.get('platformerScene');

        ourGame.events.on('healthTracker', function ()
        {
            this.HEALTH -= 1;
            healthText.setText(`Health: ${this.HEALTH}`);

        }, this);
        ourGame.events.on('restart', function ()
        {
            this.HEALTH = 3;
            healthText.setText(`Health: ${this.HEALTH}`);

        }, this);
    }

}