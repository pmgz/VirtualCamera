/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="Boot.ts" />
/// <reference path="GameState.ts" />

module VirtualCamera
{
    export class Game extends Phaser.Game
	{
        constructor()
		{
            super(800, 600, Phaser.CANVAS, 'content', null);
 
            this.state.add('Boot', Boot, false);
            this.state.add('GameState', GameState, false);

            this.state.start('Boot');
        }
    }
} 

window.onload = () => {
    var game = new VirtualCamera.Game();
}