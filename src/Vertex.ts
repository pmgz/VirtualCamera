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
		
		static distance(v1: Vertex, v2: Vertex): number
		{
			return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2) + Math.pow(v1.z - v2.z, 2));
		}
		
		static dotProduct(v1: Vertex, v2: Vertex): number
		{
			return v1.x*v2.x + v1.y*v2.y + v1.z*v2.z;
		}
		
		static crossProduct(a: Vertex, b: Vertex): Vertex
		{
			return new Vertex(a.y*b.z - a.z*b.y, a.z*b.x - a.x*b.z, a.x*b.y - a.y*b.x);
		}
	}
}