/// <reference path="../tsDefinitions/phaser.d.ts" />

module VirtualCamera
{	
	export class Polygon
	{	
		vertices: Array<string>;
		center: Vertex;
		centerWorld: Vertex;
		centerProjected: Vertex;
		normal: Vertex;
		D: number;
		
		constructor(vertices: Array<string>)
		{
			this.vertices = vertices;
			this.center = new Vertex(0, 0, 0);
			this.centerWorld = new Vertex(0, 0, 0);
			this.centerProjected = new Vertex(0, 0, 0);
			this.normal = new Vertex(0, 0, 0);
			this.D = 0;
		}
	}
}