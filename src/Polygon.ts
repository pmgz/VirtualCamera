/// <reference path="../tsDefinitions/phaser.d.ts" />

module VirtualCamera
{	
	export class Polygon
	{	
		vertices: Array<string>;
		
		constructor(vertices: Array<string>)
		{
			this.vertices = vertices;
		}
	}
}