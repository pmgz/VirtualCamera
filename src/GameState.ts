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
		log = 100;
		renderMode: number = 2;
		renderModeName = ['wireframe', 'polygons 1', 'polygons 2'];
		
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
			
			for (var i = 0; i < this.objects.length; i++)
				this.add.existing(this.objects[i]);
		}
		
		update()
		{
			if (input.keyChangeRenderMode.justDown)
			{
				this.renderMode++;
				if (this.renderMode == 3) this.renderMode = 0;
			}
			
			this.graphics.clear();
			
			var polygonsObjects: Array<PolygonSceneObject> = Array<PolygonSceneObject>();
			
			for (var j = 0; j < this.objects.length; j++)
			{
				var obj: SceneObject = this.objects[j];
				for (var i = 0; i < obj.polygons.length; i++)
				{
					polygonsObjects.push(new PolygonSceneObject(obj.polygons[i], obj));
				}
			}
			
			if (this.renderMode == 1)
			{
				polygonsObjects.sort((a: PolygonSceneObject, b: PolygonSceneObject) => {
					var campos = camera.getPosition();
					return Vertex.distance(a.polygon.center, campos) - Vertex.distance(b.polygon.center, campos);
				});
			}
			else if (this.renderMode == 2)
			{
				polygonsObjects.sort((a: PolygonSceneObject, b: PolygonSceneObject) => {
					var campos = camera.getPosition();
					var dot1 = Vertex.dotProduct(a.polygon.normal, b.polygon.center) + a.polygon.D;
					var dot2 = Vertex.dotProduct(a.polygon.normal, campos) + a.polygon.D;
					if ((dot1 < 0 && dot2 < 0) || (dot1 >= 0 && dot2 >= 0))
						return 1;
					else
						return -1;
				});
			}
			
			var g: Phaser.Graphics = this.graphics;
			for (var j = 0; j < polygonsObjects.length; j++)
			{
				var obj = polygonsObjects[j].sceneObject;
				var vertices = polygonsObjects[j].polygon.vertices;
				var v: Vertex, v0: Vertex;
				g.lineStyle(1, 0x000000, 1);
				if (this.renderMode == 1) g.beginFill(0xFF3333);
				else if (this.renderMode == 2) g.beginFill(0x66A3FF);
				v0 = obj.verticesProjected[vertices[0]];
				g.moveTo(v0.x * Game.WIDTH, v0.y * Game.HEIGHT);
				for (var i = 1; i < polygonsObjects[j].polygon.vertices.length; i++)
				{
					v = obj.verticesProjected[vertices[i]]; 
					g.lineTo(v.x * Game.WIDTH, v.y * Game.HEIGHT);
				}
				g.lineTo(v0.x * Game.WIDTH, v0.y * Game.HEIGHT);
				if (this.renderMode == 1 || this.renderMode == 2) g.endFill();
				if (this.log)
				{
					console.log(polygonsObjects[j].polygon);
					this.log--;
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
				'rotZ: ' + camera.rotationZ,
				'Render mode: ' + this.renderModeName[this.renderMode],
				'_____________',
				'Instructions:',
				'Arrows, Q, E - moving',
				'I, O, J, K, N, M - rotating',
				'A, D - zoom',
				'Left mouse button - fullscreen'
			];
			
			for (var i = 0; i < this.debugEntries.length; i++)
			{
				this.game.debug.text(this.debugEntries[i], 5, (i + 1) * 20, i >= 9 ? '#CCFF99' : '#FFFFFF');
			}
		}
	}
}