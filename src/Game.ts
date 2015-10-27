/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="Boot.ts" />
/// <reference path="GameState.ts" />

module VirtualCamera
{    
    export class Game extends Phaser.Game
	{
        static WIDTH: number = 800;
        static HEIGHT: number = 600;
        
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