/// <reference path="../tsDefinitions/phaser.d.ts" />

module VirtualCamera
{
	export class Input
	{
		cursors: Phaser.CursorKeys;
		keyJump: Phaser.Key;
		keyFullscreen: Phaser.Key;
		
		constructor(game: Phaser.Game)
		{
			this.cursors = game.input.keyboard.createCursorKeys();
			this.keyJump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			this.keyFullscreen= game.input.keyboard.addKey(Phaser.Keyboard.F);
			game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.F ]);
		}
	}
}