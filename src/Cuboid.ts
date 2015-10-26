/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="SceneObject.ts" />

module VirtualCamera
{
    export class Cuboid extends SceneObject
	{
        constructor(game: Phaser.Game, graphics: Phaser.Graphics, x: number, y: number, z: number, x_size: number, y_size: number, z_size: number)
		{
			super(game, graphics, x, y, z);
            
			var x_size = 100;
			var y_size = 100;
			var z_size = 200;
			
            this.addVertex('v1', 0, 0, 0);
			this.addVertex('v2', x_size, 0, 0);
			this.addVertex('v3', x_size, y_size, 0);
			this.addVertex('v4', 0, y_size, 0);
			this.addVertex('v5', 0, 0, z_size);
			this.addVertex('v6', x_size, 0, z_size);
			this.addVertex('v7', x_size, y_size, z_size);
			this.addVertex('v8', 0, y_size, z_size);
			this.addEdge('v1', 'v2');
			this.addEdge('v2', 'v3');
			this.addEdge('v3', 'v4');
			this.addEdge('v4', 'v1');
			this.addEdge('v5', 'v6');
			this.addEdge('v6', 'v7');
			this.addEdge('v7', 'v8');
			this.addEdge('v8', 'v5');
			this.addEdge('v1', 'v5');
			this.addEdge('v2', 'v6');
			this.addEdge('v3', 'v7');
			this.addEdge('v4', 'v8');
        }
    }
}