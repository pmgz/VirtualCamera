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
	}
}