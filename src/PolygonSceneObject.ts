/// <reference path="../tsDefinitions/phaser.d.ts" />

module VirtualCamera
{	
	export class PolygonSceneObject
	{	
		polygon: Polygon;
		sceneObject: SceneObject;
		
		constructor(polygon: Polygon, sceneObject: SceneObject)
		{
			this.polygon = polygon;
			this.sceneObject = sceneObject;
		}
	}
}