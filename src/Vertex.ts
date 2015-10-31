/// <reference path="../tsDefinitions/phaser.d.ts" />

module VirtualCamera
{	
	export class Vertex
	{
		
		x: number;
		y: number;
		z: number;
		
		constructor(x: number, y: number, z: number)
		{
			this.x = x;
			this.y = y;
			this.z = z;
		}
		
		static distance(v1: Vertex, v2: Vertex)
		{
			return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2) + Math.pow(v1.z - v2.z, 2));
		}
	}
}