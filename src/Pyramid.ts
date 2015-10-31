/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="SceneObject.ts" />

module VirtualCamera
{
    export class Pyramid extends SceneObject
	{
        constructor(
			game: Phaser.Game, 
			graphics: Phaser.Graphics, 
			x: number, 
			y: number, 
			z: number, 
			x_size: number, 
			y_size: number, 
			z_size: number,
			x_rot: number = 0,
			y_rot: number = 0,
			z_rot: number = 0)
		{
			super(game, graphics, x, y, z, x_rot, y_rot, z_rot);
            
            this.addVertex('v1', -x_size / 2, 0, -z_size / 2);
			this.addVertex('v2', x_size / 2, 0, -z_size / 2);
			this.addVertex('v3', x_size / 2, 0, z_size / 2);
			this.addVertex('v4', -x_size / 2, 0, z_size / 2);
			this.addVertex('v5', 0, y_size, 0);
			this.addEdge('v1', 'v2');
			this.addEdge('v2', 'v3');
			this.addEdge('v3', 'v4');
			this.addEdge('v4', 'v1');
			this.addEdge('v1', 'v5');
			this.addEdge('v2', 'v5');
			this.addEdge('v3', 'v5');
			this.addEdge('v4', 'v5');
			this.addPolygon(['v1', 'v2', 'v3', 'v4']);
			this.addPolygon(['v1', 'v2', 'v5']);
			this.addPolygon(['v2', 'v3', 'v5']);
			this.addPolygon(['v3', 'v4', 'v5']);
			this.addPolygon(['v4', 'v1', 'v5']);
        }
		
		update()
		{
			this.rotationY += 1;
			this.updateRotationMatrices();
			this.updateModelMatrix();
			super.update();
		}
    }
}