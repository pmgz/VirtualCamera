/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="Camera.ts" />
/// <reference path="Game.ts" />

module VirtualCamera
{
	export var camera: Camera;
	
	export class GameState extends Phaser.State
	{
		graphics: Phaser.Graphics;
		offset: number = 0;
		
		create()
		{	
			this.stage.backgroundColor =  0xFFFFFF;
			
			this.graphics = this.game.add.graphics(300, 200);
			camera = new Camera(this.game);
			this.add.existing(camera);
			
			var obj = new SceneObject(this.game, this.graphics);
			obj.addVertex('v1', 20, 0, 0);
			obj.addVertex('v2', 40, 20, 0);
			obj.addVertex('v3', 40, 20, 0);
			obj.addVertex('v4', 20, 20, 0);
			obj.addVertex('v5', 20, 0, 60);
			obj.addVertex('v6', 40, 20, 60);
			obj.addVertex('v7', 40, 20, 60);
			obj.addVertex('v8', 20, 20, 60);
			obj.addEdge('v1', 'v2');
			obj.addEdge('v2', 'v3');
			obj.addEdge('v3', 'v4');
			obj.addEdge('v4', 'v1');
			obj.addEdge('v5', 'v6');
			obj.addEdge('v6', 'v7');
			obj.addEdge('v7', 'v8');
			obj.addEdge('v8', 'v5');
			obj.addEdge('v1', 'v5');
			obj.addEdge('v2', 'v6');
			obj.addEdge('v3', 'v7');
			obj.addEdge('v4', 'v8');
			this.add.existing(obj);
		}
		
		update()
		{
			this.graphics.clear();
			
			this.graphics.lineStyle(1, 0x000000, 1);
			this.graphics.moveTo(0, 0);  
			this.graphics.lineTo(100 + this.offset, 0);
		
			this.graphics.lineStyle(1, 0x000000, 1);
			this.graphics.moveTo(100 + this.offset, 0);  
			this.graphics.lineTo(100, 100);
		
			this.graphics.lineStyle(1, 0x000000, 1);
			this.graphics.moveTo(100, 100);  
			this.graphics.lineTo(0, 100);
		
			this.graphics.lineStyle(1, 0x000000, 1);
			this.graphics.moveTo(0, 100);  
			this.graphics.lineTo(0, 0);

		}
		
		render()
		{
			this.game.debug.text('FPS: ' + this.game.time.fps.toString(), 5, 20, '#ffffff');
		}
	}
}