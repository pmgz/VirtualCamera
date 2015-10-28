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
			camera = new Camera(this.game, -88, -67, 118, -12, 19, 0);
			this.add.existing(camera);
			
			this.add.existing(new Cuboid(this.game, this.graphics, 0, 0, 0, 10, 20, 10));
			this.add.existing(new Cuboid(this.game, this.graphics, 0, 0, 15, 10, 15, 10, 0, 16));
			this.add.existing(new Cuboid(this.game, this.graphics, 0, 0, 30, 10, 30, 10));
			this.add.existing(new Cuboid(this.game, this.graphics, 40, 0, 0, 10, 13, 10, 0, 45));
			this.add.existing(new Cuboid(this.game, this.graphics, 40, 0, 15, 10, 17, 10));
			this.add.existing(new Cuboid(this.game, this.graphics, 40, 0, 30, 10, 8, 10));
			this.add.existing(new Plane(this.game, this.graphics, 13, 0, -10, 10, 60));
			this.add.existing(new Plane(this.game, this.graphics, 27, 0, -10, 10, 60));
			
			var tree_z = 0;
			this.add.existing(new Cuboid(this.game, this.graphics, 24.5, 0, tree_z, 1, 3, 1));
			this.add.existing(new Cuboid(this.game, this.graphics, 24.5 - 2, 3, tree_z -2, 5, 5, 5));
			
			tree_z = 10;
			this.add.existing(new Cuboid(this.game, this.graphics, 24.5, 0, tree_z, 1, 3, 1));
			this.add.existing(new Cuboid(this.game, this.graphics, 24.5 - 2, 3, tree_z -2, 5, 5, 5));
			
			tree_z = 20;
			this.add.existing(new Cuboid(this.game, this.graphics, 24.5, 0, tree_z, 1, 3, 1));
			this.add.existing(new Cuboid(this.game, this.graphics, 24.5 - 2, 3, tree_z -2, 5, 5, 5));
			
			tree_z = 30;
			this.add.existing(new Cuboid(this.game, this.graphics, 24.5, 0, tree_z, 1, 3, 1));
			this.add.existing(new Cuboid(this.game, this.graphics, 24.5 - 2, 3, tree_z -2, 5, 5, 5));
			
			tree_z = 40;
			this.add.existing(new Cuboid(this.game, this.graphics, 24.5, 0, tree_z, 1, 3, 1));
			this.add.existing(new Cuboid(this.game, this.graphics, 24.5 - 2, 3, tree_z -2, 5, 5, 5));
			
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