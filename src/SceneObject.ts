/// <reference path="../tsDefinitions/phaser.d.ts" />
/// <reference path="Camera.ts" />
/// <reference path="Polygon.ts" />

module VirtualCamera
{	
	export class SceneObject extends Phaser.Sprite
	{
		graphics: Phaser.Graphics;
		vertices: Array<Vertex>;
		verticesWorld: Array<Vertex>;
		verticesProjected: Array<Vertex>;
		edges: Array<Edge>;
		polygons: Array<Polygon>;
		
		rotationX: number = 0;
		rotationY: number = 0;
		rotationZ: number = 0;
		
		rotationXMatrix: any;
		rotationYMatrix: any;
		rotationZMatrix: any;
		translationMatrix: any;
		modelMatrix: any;
		
		constructor(
			game: Phaser.Game, 
			graphics: Phaser.Graphics, 
			x: number, 
			y: number, 
			z: number,
			x_rot: number = 0,
			y_rot: number = 0,
			z_rot: number = 0)
		{
			super(game, 0, 0);
			this.graphics = graphics;
			this.vertices = new Array();
			this.verticesWorld = new Array();
			this.verticesProjected = new Array();
			this.edges = new Array();
			this.polygons = new Array();
			this.translationMatrix = math.matrix([
				[1, 0, 0, x],
				[0, 1, 0, y],
				[0, 0, 1, z],
				[0, 0, 0, 1]
			]);
			this.rotationX = x_rot;
			this.rotationY = y_rot;
			this.rotationZ = z_rot;
			this.updateRotationMatrices();
			this.updateModelMatrix();
		}
		
		update()
		{
			this.updateModelMatrix();
			var mvp = math.multiply(math.multiply(camera.projectionMatrix, camera.modelMatrix), this.modelMatrix);
			
			for (var key in this.vertices)
			{
				var v =  this.vertices[key];
				var vProjected = math.multiply(mvp, [v.x, v.y, v.z, 1])
				this.verticesProjected[key].x = vProjected._data[0];
				this.verticesProjected[key].y = vProjected._data[1];
				if (vProjected._data[3] != 1)
				{
					this.verticesProjected[key].x /= vProjected._data[3];
					this.verticesProjected[key].y /= vProjected._data[3];
				}
			}
		}
		
		addVertex(name: string, x: number, y: number, z: number)
		{
			this.vertices[name] = new Vertex(x, y, z);
			this.verticesWorld[name] = new Vertex(x, y, z);
			this.verticesProjected[name] = new Vertex(x, y, z);
		}
		
		addEdge(vertex1: string, vertex2: string)
		{
			this.edges.push(new Edge(vertex1, vertex2));
		}
		
		addPolygon(vertices: Array<string>)
		{
			this.polygons.push(new Polygon(vertices));
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
		
		updateModelMatrix()
		{
			this.modelMatrix = math.multiply(this.translationMatrix,
								math.multiply(
									math.multiply(this.rotationXMatrix, this.rotationYMatrix), 
										this.rotationZMatrix));
										
			for (var key in this.vertices)
			{
				var v = this.vertices[key];
				var vWorld = math.multiply(this.modelMatrix, [v.x, v.y, v.z, 1])
				this.verticesWorld[key].x = vWorld._data[0];
				this.verticesWorld[key].y = vWorld._data[1];
				this.verticesWorld[key].z = vWorld._data[2];
			}
			
			for (var j = 0; j < this.polygons.length; j++)
			{
				var sx = 0, sy = 0, sz = 0;
				var p = this.polygons[j];
				var vnum = p.vertices.length;
				for (var i = 0; i < vnum; i++)
				{
					var ver = this.verticesWorld[p.vertices[i]];
					sx += ver.x;
					sy += ver.y;
					sz += ver.z;
				}
				p.center.x = sx / vnum;
				p.center.y = sy / vnum;
				p.center.z = sz / vnum;
				
				var v1 = this.verticesWorld[p.vertices[0]];
				var v2 = this.verticesWorld[p.vertices[1]];
				var v3 = this.verticesWorld[p.vertices[2]];
				var vec1 = new Vertex(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
				var vec2 = new Vertex(v3.x - v2.x, v3.y - v2.y, v3.z - v2.z);
				p.normal = Vertex.crossProduct(vec1, vec2);
				p.D = -Vertex.dotProduct(v1, p.normal);
			}
		}
	}
}