/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="SceneObject.ts" />

module VirtualCamera
{
    export class BuildingSmall extends SceneObject
	{
        constructor(game: Phaser.Game, graphics: Phaser.Graphics, x: number, y: number, z: number)
		{
			super(game, graphics, x, y, z);
            
            this.addVertex('v1', 20, 0, 0);
			this.addVertex('v2', 40, 0, 0);
			this.addVertex('v3', 40, 20, 0);
			this.addVertex('v4', 20, 20, 0);
			this.addVertex('v5', 20, 0, 20);
			this.addVertex('v6', 40, 0, 20);
			this.addVertex('v7', 40, 20, 20);
			this.addVertex('v8', 20, 20, 20);
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