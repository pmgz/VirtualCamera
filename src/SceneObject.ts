/// <reference path="../tsDefinitions/phaser.d.ts" />

module VirtualCamera
{	
	export class SceneObject extends Phaser.Sprite
	{
		graphics: Phaser.Graphics;
		vertices: Array<Vertex>;
		edges: Array<Edge>;
		modelMatrix: any;
		
		constructor(game: Phaser.Game, graphics: Phaser.Graphics)
		{
			super(game, 0, 0);
			this.graphics = graphics;
			this.vertices = new Array();
			this.edges = new Array();
			this.modelMatrix = math.eye(4);
		}
		
		create()
		{
		}
		
		update()
		{
			var g: Phaser.Graphics = this.graphics;
			var v1: Vertex, v2: Vertex;
			for (var i = 0; i < this.edges.length; i++)
			{
				v1 = this.vertices[this.edges[i].vertex1];
				v2 = this.vertices[this.edges[i].vertex2];
				
				
				g.lineStyle(1, 0x000000, 1);
				g.moveTo(0, 0);  
				g.lineTo(100, 0);
			}
		}
		
		render()
		{
			//
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