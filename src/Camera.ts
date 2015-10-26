/// <reference path="../tsDefinitions/phaser.d.ts" />

module VirtualCamera
{	
	export class Camera extends Phaser.Sprite
	{
		rotationXMatrix: any;
		rotationYMatrix: any;
		rotationZMatrix: any;
		translationMatrix: any;
		viewMatrix: any;
		projectionMatrix: any;
		projectionViewMatrix: any;
		fov: number = 60;
		rotationX: number = 0;
		rotationY: number = 0;
		rotationZ: number = 0;
		
		updateProjectionMatrix()
		{
			var a = 800 / 600;
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
			
			/*var n = 0.1;
			var f = 100;
			var scale = Math.tan(fov * 0.5 * Math.PI / 180) * n;
			var r = a * scale;
			var l = -r;
			var t = scale;
			var b = -t; 
			this.projectionMatrix = math.matrix([
				[(2*n)/(r-l) , 0	   , (r+l)/(r-l)	   	, 0					 	 ],
				[0		 , (2*n)/(t-b) , (t+b)/(t-b)	   	, 0					 	 ],
				[0		 , 0	   , -(f+n)/(f-n) , -(2*f*n)/(f-n) ],
				[0		 , 0	   , -1	   	, 0					 	 ]
			]);*/
			
			//this.projectionMatrix = math.transpose(this.projectionMatrix);
		}
		
		updateRotationMatrices()
		{
			var angleX = this.rotationX * Math.PI / 180;
			this.rotationXMatrix = math.matrix([
				[1, 0, 0, 0],
				[0, Math.cos(angleX), -Math.sin(angleX), 0],
				[0, Math.sin(angleX), Math.cos(angleX), 0],
				[0, 0, 0, 1]
			]);
			
			var angleY = this.rotationY * Math.PI / 180;
			this.rotationYMatrix = math.matrix([
				[Math.cos(angleY), 0, Math.sin(angleY), 0],
				[0, 1, 0, 0],
				[-Math.sin(angleY), 0, Math.cos(angleY), 0],
				[0, 0, 0, 1]
			]);
			
			var angleZ = this.rotationZ * Math.PI / 180;
			this.rotationZMatrix = math.matrix([
				[Math.cos(angleZ), -Math.sin(angleZ), 0, 0],
				[Math.sin(angleZ), Math.cos(angleZ), 0, 0],
				[0, 0, 1, 0],
				[0, 0, 0, 1]
			]);
		}
		
		updateViewMatrix()
		{
			this.viewMatrix = math.multiply(
								math.multiply(
									math.multiply(this.rotationXMatrix, this.rotationYMatrix), 
										this.rotationZMatrix),
											this.translationMatrix);
		}
		
		constructor(game: Phaser.Game)
		{
			super(game, 0, 0);
			
			this.translationMatrix = math.matrix([
				[1, 0, 0, 20 ],
				[0, 1, 0, 0 ],
				[0, 0, 1, 0 ],
				[0, 0, 0, 1 ],
			]);
			this.updateProjectionMatrix();
			this.updateRotationMatrices();
			this.updateViewMatrix();
		}
		
		update()
		{
			var movementSpeed = 1;
			var rotationSpeed = 1;
			var zoomSpeed = 1;
			
			if (input.cursors.up.isDown)
			{
				this.translationMatrix._data[2][3] -= movementSpeed;
			}
			
			if (input.cursors.down.isDown)
			{
				this.translationMatrix._data[2][3] += movementSpeed;
			}
			
			if (input.cursors.left.isDown)
			{
				this.translationMatrix._data[0][3] -= movementSpeed;
			}
			
			if (input.cursors.right.isDown)
			{
				this.translationMatrix._data[0][3] += movementSpeed;
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
			
			this.updateProjectionMatrix();
			this.updateRotationMatrices();
			this.updateViewMatrix();
		}
	}
}