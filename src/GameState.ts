/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="Camera.ts" />
/// <reference path="Game.ts" />

module VirtualCamera
{
	export var camera: Camera;
	
	export class GameState extends Phaser.State
	{
		graphics: Phaser.Graphics;
		offset: number = 0;
		
		create()
		{	
			this.stage.backgroundColor =  0xFFFFFF;
			
			this.graphics = this.game.add.graphics(300, 200);
			camera = new Camera(this.game);
			console.log(camera);
			this.add.existing(camera);
			
			this.add.existing(new BuildingSmall(this.game, this.graphics, 0, 0, 0));
			this.add.existing(new BuildingSmall(this.game, this.graphics, 10, 10, 10));
		}
		
		update()
		{
			this.graphics.clear();

		}
		
		render()
		{
			this.game.debug.text('FPS: ' + this.game.time.fps.toString(), 5, 20, '#ffffff');
		}
	}
}