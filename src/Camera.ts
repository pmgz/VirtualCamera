/// <reference path="../tsDefinitions/phaser.d.ts" />

module VirtualCamera
{	
	export class Camera extends Phaser.Sprite
	{
		viewMatrix: any;
		projectionMatrix: any;
		
		constructor(game: Phaser.Game)
		{
			super(game, 0, 0);
			var a = 800 / 600;
			var fov = 60;
			var Znear = 0.1;
			var Zfar = 100;
			var zm = Zfar - Znear;
			var zp = Zfar + Znear;
			var y_scale = math.cot((fov * 0.5) * (Math.PI/180));
			var x_scale = y_scale / a;
			
			this.projectionMatrix = math.matrix([
				[x_scale , 0	   , 0	   	, 0					 	 ],
				[0		 , y_scale , 0	   	, 0					 	 ],
				[0		 , 0	   , -zp/zm , -(2 * Zfar * Znear)/zm ],
				[0		 , 0	   , -1	   	, 0					 	 ]
			]);
			
			this.viewMatrix = math.matrix([
				[0, 0, 0, 10],
				[0, 1, 0, 0 ],
				[0, 0, 1, 0 ],
				[0, 0, 0, 1 ],
			]);
		}
		
		update()
		{
			
		}
	}
}