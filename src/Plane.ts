/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="SceneObject.ts" />

module VirtualCamera
{
    export class Plane extends SceneObject
	{
        constructor(game: Phaser.Game, graphics: Phaser.Graphics, x: number, y: number, z: number, x_size: number, z_size: number)
		{
			super(game, graphics, x, y, z);
            
            this.addVertex('v1', 0, 0, 0);
			this.addVertex('v2', x_size, 0, 0);
			this.addVertex('v3', x_size, 0, z_size);
			this.addVertex('v4', 0, 0, z_size);
			this.addEdge('v1', 'v2');
			this.addEdge('v2', 'v3');
			this.addEdge('v3', 'v4');
			this.addEdge('v4', 'v1');
        }
    }
}