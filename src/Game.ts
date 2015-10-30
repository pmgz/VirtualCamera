/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="Boot.ts" />
/// <reference path="GameState.ts" />

module VirtualCamera
{    
    export class Game extends Phaser.Game
	{
        static WIDTH: number = window.screen.width;
        static HEIGHT: number = window.screen.height;
        
        constructor()
		{
            super(Game.WIDTH, Game.HEIGHT, Phaser.CANVAS, 'content', null);
 
            this.state.add('Boot', Boot, false);
            this.state.add('GameState', GameState, false);

            this.state.start('Boot');
        }
    }
} 

window.onload = () => {
    var game = new VirtualCamera.Game();
}