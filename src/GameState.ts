/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="Camera.ts" />
/// <reference path="Game.ts" />
/// <reference path="SceneObject.ts" />

module VirtualCamera
{
	export var camera: Camera;
	
	export class GameState extends Phaser.State
	{
		graphics: Phaser.Graphics;
		debugEntries: Array<string>;
		objects: Array<SceneObject>;
		
		create()
		{	
			this.game.input.onDown.add(
            	() => { this.game.scale.startFullScreen(false); },
            this);
			this.stage.backgroundColor = 0xFFFFFF;
			
			this.graphics = this.game.add.graphics(Game.WIDTH / 2, Game.HEIGHT / 2);
			camera = new Camera(this.game, -66, -67, 98, -22, 19, 0);
			this.add.existing(camera);
			
			this.objects = [];		
			this.objects.push(new Cuboid(this.game, this.graphics, -2, 0, 0, 10, 20, 10, 0, 10));
			this.objects.push(new Cuboid(this.game, this.graphics, -2, 0, 17, 10, 15, 10, 0, 16));
			this.objects.push(new Cuboid(this.game, this.graphics, -2, 0, 34, 10, 30, 10, 0, 30));
			this.objects.push(new Cuboid(this.game, this.graphics, 40, 0, 0, 10, 13, 10, 0, 45));
			this.objects.push(new Cuboid(this.game, this.graphics, 40, 0, 17, 10, 17, 10, 0, 30));
			this.objects.push(new Cuboid(this.game, this.graphics, 40, 0, 34, 10, 8, 10, 0, 22));
			
			this.objects.push(new Plane(this.game, this.graphics, 13, 0, -10, 10, 60));
			this.objects.push(new Plane(this.game, this.graphics, 27, 0, -10, 10, 60));
			
			this.objects.push(new Pyramid(this.game, this.graphics, 24.5, 0, 70, 20, 40, 20));
			
			var tree_z = 0;
			this.objects.push(new Cuboid(this.game, this.graphics, 24.5, 0, tree_z, 1, 3, 1));
			this.objects.push(new Cuboid(this.game, this.graphics, 24.5 - 2, 3, tree_z -2, 5, 5, 5));
			
			tree_z = 10;
			this.objects.push(new Cuboid(this.game, this.graphics, 24.5, 0, tree_z, 1, 3, 1));
			this.objects.push(new Cuboid(this.game, this.graphics, 24.5 - 2, 3, tree_z -2, 5, 5, 5));
			
			tree_z = 20;
			this.objects.push(new Cuboid(this.game, this.graphics, 24.5, 0, tree_z, 1, 3, 1));
			this.objects.push(new Cuboid(this.game, this.graphics, 24.5 - 2, 3, tree_z -2, 5, 5, 5));
			
			tree_z = 30;
			this.objects.push(new Cuboid(this.game, this.graphics, 24.5, 0, tree_z, 1, 3, 1));
			this.objects.push(new Cuboid(this.game, this.graphics, 24.5 - 2, 3, tree_z -2, 5, 5, 5));
			
			tree_z = 40;
			this.objects.push(new Cuboid(this.game, this.graphics, 24.5, 0, tree_z, 1, 3, 1));
			this.objects.push(new Cuboid(this.game, this.graphics, 24.5 - 2, 3, tree_z -2, 5, 5, 5));
			
			this.debugEntries = new Array<string>();
			
			//for (var i = 0; i < this.objects.length; i++)
				//this.add.existing(this.objects[i]);
		}
		
		update()
		{
			this.graphics.clear();
			for (var j = 0; j < this.objects.length; j++)
			{
				var obj: SceneObject = this.objects[j];
				
				var mvp = math.multiply(math.multiply(camera.projectionMatrix, camera.modelMatrix), obj.modelMatrix);
			
				var g: Phaser.Graphics = this.graphics;
				var v1: Vertex, v2: Vertex;
				for (var i = 0; i < obj.edges.length; i++)
				{
					v1 = obj.vertices[obj.edges[i].vertex1];
					v2 = obj.vertices[obj.edges[i].vertex2];
					
					var v1n = math.multiply(mvp, [v1.x, v1.y, v1.z, 1]);
					var v2n = math.multiply(mvp, [v2.x, v2.y, v2.z, 1]);
					
					g.lineStyle(1, 0x000000, 1);
					if (v1n._data[3] != 1)
					{
						v1n._data[0] /= v1n._data[3];
						v1n._data[1] /= v1n._data[3];
					}
					if (v2n._data[3] != 1)
					{
						v2n._data[0] /= v2n._data[3];
						v2n._data[1] /= v2n._data[3];
					}
					g.moveTo(v1n._data[0] * Game.WIDTH, v1n._data[1] * Game.HEIGHT);  
					g.lineTo(v2n._data[0] * Game.WIDTH, v2n._data[1] * Game.HEIGHT);
				}
			}
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