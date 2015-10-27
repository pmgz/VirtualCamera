/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="Camera.ts" />
/// <reference path="Game.ts" />

module VirtualCamera
{
	export var camera: Camera;
	
	export class GameState extends Phaser.State
	{
		graphics: Phaser.Graphics;
		debugEntries: Array<string>;
		
		create()
		{	
			this.stage.backgroundColor = 0xFFFFFF;
			
			this.graphics = this.game.add.graphics(300, 200);
			camera = new Camera(this.game);
			console.log(camera);
			this.add.existing(camera);
			
			this.add.existing(new Cuboid(this.game, this.graphics, 0, 0, 0, 10, 50, 10));
			this.add.existing(new Cuboid(this.game, this.graphics, 15, 15, 15, 10, 10, 200));
			
			this.debugEntries = new Array<string>();
		}
		
		update()
		{
			this.graphics.clear();
		}
		
		render()
		{
			this.debugEntries = [
				'FPS: ' + this.game.time.fps,
				'Fov: ' + camera.fov,
				'X: ' + camera.translationMatrix._data[0][3],
				'Y: ' + camera.translationMatrix._data[1][3],
				'Z: ' + camera.translationMatrix._data[2][3],
				'rotX: ' + camera.rotationX,
				'rotY: ' + camera.rotationY,
				'rotZ: ' + camera.rotationZ
			];
			
			for (var i = 0; i < this.debugEntries.length; i++)
			{
				this.game.debug.text(this.debugEntries[i], 5, (i + 1) * 20, '#ffffff');
			}
		}
	}
}