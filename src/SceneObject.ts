/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="Camera.ts" />

module VirtualCamera
{	
	export class SceneObject extends Phaser.Sprite
	{
		graphics: Phaser.Graphics;
		vertices: Array<Vertex>;
		edges: Array<Edge>;
		
		rotationX: number = 0;
		rotationY: number = 0;
		rotationZ: number = 0;
		
		rotationXMatrix: any;
		rotationYMatrix: any;
		rotationZMatrix: any;
		translationMatrix: any;
		modelMatrix: any;
		
		constructor(
			game: Phaser.Game, 
			graphics: Phaser.Graphics, 
			x: number, 
			y: number, 
			z: number,
			x_rot: number = 0,
			y_rot: number = 0,
			z_rot: number = 0)
		{
			super(game, 0, 0);
			this.graphics = graphics;
			this.vertices = new Array();
			this.edges = new Array();
			this.translationMatrix = math.matrix([
				[1, 0, 0, x],
				[0, 1, 0, y],
				[0, 0, 1, z],
				[0, 0, 0, 1]
			]);
			this.rotationX = x_rot;
			this.rotationY = y_rot;
			this.rotationZ = z_rot;
			this.updateRotationMatrices();
			this.updateModelMatrix();
		}
		
		create()
		{
		}
		
		update()
		{
			var mvp = math.multiply(math.multiply(camera.projectionMatrix, camera.modelMatrix), this.modelMatrix);
			
			var g: Phaser.Graphics = this.graphics;
			var v1: Vertex, v2: Vertex;
			for (var i = 0; i < this.edges.length; i++)
			{
				v1 = this.vertices[this.edges[i].vertex1];
				v2 = this.vertices[this.edges[i].vertex2];
				
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
		
		addVertex(name: string, x: number, y: number, z: number)
		{
			this.vertices[name] = new Vertex(x, y, z);
		}
		
		addEdge(vertex1: string, vertex2: string)
		{
			this.edges.push(new Edge(vertex1, vertex2));
		}
		
		updateRotationMatrices()
		{
			var angleX = this.rotationX * Math.PI / 180;
			this.rotationXMatrix = math.matrix([
				[1, 0, 0, 0],
				[0, Math.cos(angleX), -Math.sin(angleX), 0],
				[0, Math.sin(angleX), Math.cos(angleX), 0],
				[0, 0, 0, 1]
			]);
			
			var angleY = this.rotationY * Math.PI / 180;
			this.rotationYMatrix = math.matrix([
				[Math.cos(angleY), 0, Math.sin(angleY), 0],
				[0, 1, 0, 0],
				[-Math.sin(angleY), 0, Math.cos(angleY), 0],
				[0, 0, 0, 1]
			]);
			
			var angleZ = this.rotationZ * Math.PI / 180;
			this.rotationZMatrix = math.matrix([
				[Math.cos(angleZ), -Math.sin(angleZ), 0, 0],
				[Math.sin(angleZ), Math.cos(angleZ), 0, 0],
				[0, 0, 1, 0],
				[0, 0, 0, 1]
			]);
		}
		
		updateModelMatrix()
		{
			this.modelMatrix = math.multiply(this.translationMatrix,
								math.multiply(
									math.multiply(this.rotationXMatrix, this.rotationYMatrix), 
										this.rotationZMatrix));
		}
	}
}