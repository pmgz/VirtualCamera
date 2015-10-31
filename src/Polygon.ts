/// <reference path="../tsDefinitions/phaser.d.ts" />

module VirtualCamera
{	
	export class Polygon
	{	
		vertices: Array<string>;
		center: Vertex;
		
		constructor(vertices: Array<string>)
		{
			this.vertices = vertices;
			this.center = new Vertex(0, 0, 0);
		}
	}
}