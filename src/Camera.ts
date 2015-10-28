/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="SceneObject.ts" />

module VirtualCamera
{	
	export class Camera extends SceneObject
	{
		projectionMatrix: any;
		fov: number = 60;
		
		updateProjectionMatrix()
		{
			var a = Game.WIDTH / Game.HEIGHT;
			var fov = this.fov;
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
		}
		
		
		constructor(game: Phaser.Game, x: number, y: number, z: number, x_rot: number, y_rot: number, z_rot: number)
		{
			super(game, null, x, y, z, x_rot, y_rot, z_rot);
			this.updateProjectionMatrix();
		}
		
		updateModelMatrix()
		{
			this.modelMatrix = math.multiply(
								math.multiply(
									math.multiply(this.rotationXMatrix, this.rotationYMatrix), 
										this.rotationZMatrix),
											this.translationMatrix);
		}
		
		update()
		{
			var movementSpeed = 1;
			var rotationSpeed = 1;
			var zoomSpeed = 1;
			
			if (input.cursors.up.isDown)
			{			
				var angle = (this.rotationY - 90) * Math.PI / 180;
				this.translationMatrix._data[0][3] += movementSpeed * Math.cos(angle);
				this.translationMatrix._data[2][3] += movementSpeed * Math.sin(angle);
			}
			
			if (input.cursors.down.isDown)
			{
				var angle = (this.rotationY - 270) * Math.PI / 180;
				this.translationMatrix._data[0][3] += movementSpeed * Math.cos(angle);
				this.translationMatrix._data[2][3] += movementSpeed * Math.sin(angle);
			}
			
			if (input.cursors.left.isDown)
			{
				var angle = (this.rotationY - 180) * Math.PI / 180;
				this.translationMatrix._data[0][3] += movementSpeed * Math.cos(angle);
				this.translationMatrix._data[2][3] += movementSpeed * Math.sin(angle);
			}
			
			if (input.cursors.right.isDown)
			{
				var angle = this.rotationY * Math.PI / 180;
				this.translationMatrix._data[0][3] += movementSpeed * Math.cos(angle);
				this.translationMatrix._data[2][3] += movementSpeed * Math.sin(angle);
			}
			
			if (input.keyFlyUp.isDown)
			{
				this.translationMatrix._data[1][3] -= movementSpeed;
			}
			
			if (input.keyFlyDown.isDown)
			{
				this.translationMatrix._data[1][3] += movementSpeed;
			}
			
			if (input.keyZoomIn.isDown)
			{
				this.fov -= zoomSpeed;
			}
			
			if (input.keyZoomOut.isDown)
			{
				this.fov += zoomSpeed;
			}
			
			if (input.keyRotateXLeft.isDown)
			{
				this.rotationX -= rotationSpeed;
			}
			
			if (input.keyRotateXRight.isDown)
			{
				this.rotationX += rotationSpeed;
			}
			
			if (input.keyRotateYLeft.isDown)
			{
				this.rotationY -= rotationSpeed;
			}
			
			if (input.keyRotateYRight.isDown)
			{
				this.rotationY += rotationSpeed;
			}
			
			if (input.keyRotateZLeft.isDown)
			{
				this.rotationZ -= rotationSpeed;
			}
			
			if (input.keyRotateZRight.isDown)
			{
				this.rotationZ += rotationSpeed;
			}
			
			if (input.keyResetRotation.justDown)
			{
				this.rotationX = 0;
				this.rotationZ = 0;
			}
			
			this.updateProjectionMatrix();
			this.updateRotationMatrices();
			this.updateModelMatrix();
		}
	}
}