/// <reference path="../tsDefinitions/phaser.d.ts" />

module VirtualCamera
{
	export class Input
	{
		cursors: Phaser.CursorKeys;
		keyFullscreen: Phaser.Key;
		keyFlyUp: Phaser.Key;
		keyFlyDown: Phaser.Key;
		keyZoomIn: Phaser.Key;
		keyZoomOut: Phaser.Key;
		keyRotateXLeft: Phaser.Key;
		keyRotateXRight: Phaser.Key;
		keyRotateYLeft: Phaser.Key;
		keyRotateYRight: Phaser.Key;
		keyRotateZLeft: Phaser.Key;
		keyRotateZRight: Phaser.Key;
		keyResetRotation: Phaser.Key;
		keyChangeRenderMode: Phaser.Key;
		
		constructor(game: Phaser.Game)
		{
			this.cursors = game.input.keyboard.createCursorKeys();
			this.keyResetRotation = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			this.keyFullscreen = game.input.keyboard.addKey(Phaser.Keyboard.F);
			this.keyFlyUp = game.input.keyboard.addKey(Phaser.Keyboard.Q);
			this.keyFlyDown = game.input.keyboard.addKey(Phaser.Keyboard.E);
			this.keyZoomIn = game.input.keyboard.addKey(Phaser.Keyboard.A);
			this.keyZoomOut = game.input.keyboard.addKey(Phaser.Keyboard.D);
			this.keyRotateXLeft = game.input.keyboard.addKey(Phaser.Keyboard.I);
			this.keyRotateXRight = game.input.keyboard.addKey(Phaser.Keyboard.O);
			this.keyRotateYLeft = game.input.keyboard.addKey(Phaser.Keyboard.J);
			this.keyRotateYRight = game.input.keyboard.addKey(Phaser.Keyboard.K);
			this.keyRotateZLeft = game.input.keyboard.addKey(Phaser.Keyboard.N);
			this.keyRotateZRight = game.input.keyboard.addKey(Phaser.Keyboard.M);
			this.keyChangeRenderMode = game.input.keyboard.addKey(Phaser.Keyboard.R);
			
			game.input.keyboard.addKeyCapture([
				Phaser.Keyboard.SPACEBAR,
				Phaser.Keyboard.F,
				Phaser.Keyboard.Q,
				Phaser.Keyboard.E,
				Phaser.Keyboard.A,
				Phaser.Keyboard.D,
				Phaser.Keyboard.I,
				Phaser.Keyboard.O,
				Phaser.Keyboard.J,
				Phaser.Keyboard.K,
				Phaser.Keyboard.N,
				Phaser.Keyboard.M,
				Phaser.Keyboard.R
			]);
		}
	}
}