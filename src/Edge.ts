/// <reference path="../tsDefinitions/phaser.d.ts" />

module VirtualCamera
{	
	export class Edge
	{	
		vertex1: string;
		vertex2: string;
		
		constructor(vertex1: string, vertex2: string)
		{
			this.vertex1 = vertex1;
			this.vertex2 = vertex2;
		}
	}
}