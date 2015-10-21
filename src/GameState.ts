/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="Camera.ts" />
/// <reference path="Game.ts" />

module VirtualCamera
{
	export class GameState extends Phaser.State
	{
		line: Phaser.Line;
		bmd: Phaser.BitmapData;
		graphics: Phaser.Graphics;
		
		create()
		{	
			this.stage.backgroundColor =  0xFFFFFF;
			
			var graphics = this.game.add.graphics(300, 200);

			graphics.lineStyle(1, 0x000000, 1);
			graphics.moveTo(0, 0);  
			graphics.lineTo(100, 0);
		
			graphics.lineStyle(1, 0x000000, 1);
			graphics.moveTo(100, 0);  
			graphics.lineTo(100, 100);
		
			graphics.lineStyle(1, 0x000000, 1);
			graphics.moveTo(100, 100);  
			graphics.lineTo(0, 100);
		
			graphics.lineStyle(1, 0x000000, 1);
			graphics.moveTo(0, 100);  
			graphics.lineTo(0, 0);
		}
		
		update()
		{

		}
		
		render()
		{
			this.game.debug.text('FPS: ' + this.game.time.fps.toString(), 5, 20, '#ffffff');
		}
	}
}