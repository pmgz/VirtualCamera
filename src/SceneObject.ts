/// <reference path="../tsDefinitions/phaser.d.ts" />

module VirtualCamera
{	
	export class SceneObject extends Phaser.Sprite
	{
		graphics: Phaser.Graphics;
		vertices: Array<Vertex>;
		edges: Array<Edge>;
		modelMatrix: any;
		log: number = 12;
		
		constructor(game: Phaser.Game, graphics: Phaser.Graphics, x: number, y: number, z: number)
		{
			super(game, 0, 0);
			this.graphics = graphics;
			this.vertices = new Array();
			this.edges = new Array();
			this.modelMatrix = math.matrix([
				[1, 0, 0, x],
				[0, 1, 0, y],
				[0, 0, 1, z],
				[0, 0, 0, 1]
			]);
		}
		
		create()
		{
		}
		
		update()
		{
			var mvp = math.multiply(math.multiply(camera.projectionMatrix, camera.viewMatrix), this.modelMatrix);
			
			var g: Phaser.Graphics = this.graphics;
			var v1: Vertex, v2: Vertex;
			for (var i = 0; i < this.edges.length; i++)
			{
				v1 = this.vertices[this.edges[i].vertex1];
				v2 = this.vertices[this.edges[i].vertex2];
				
				var v1n = math.multiply(mvp, [v1.x, v1.y, v1.z, 1]);
				var v2n = math.multiply(mvp, [v2.x, v2.y, v2.z, 1]);
				
				if (this.log)
				{
					console.log(v1n);
					console.log(v2n);
					console.log(i);
					//console.log(mvp);
					this.log--;
					//console.log(v1n._data[2]);
					//console.log(v1n._data[3]);
				}
				
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
				g.moveTo(v1n._data[0], v1n._data[1]);  
				g.lineTo(v2n._data[0], v2n._data[1]);
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
	}
}