import angular from 'angular';
import enums from "../../../enums.js";
import creatorObjects from "../../shared/services/CreatorObjects.service";
import Debug from "../../shared/utils/Debug";

class FabricParse {
	constructor(creatorObjects)
	{
		this.creatorObjects = creatorObjects;
		this.objects = {};
		this.init();
	}
	
	init()
	{
		this.creatorObjects.getObjects().then(function(objects){
			this.objects = objects;
		}.bind(this));
	}
	
	decode(objectId, scale)
	{
		scale  = scale === undefined ? 1:scale;
		
		var objDef = this.objects[objectId];
		var params = objDef.params;
		var fObj = null;
		
		Debug.Assert(params.fabricObjectType, "LevelEditController.createObject: fabricObjectType param not found.");
		
		switch(parseInt(params.fabricObjectType.value))
		{
			case enums.FabricObjectTypes.LINE:
			case enums.FabricObjectTypes.CIRCLE:
			case enums.FabricObjectTypes.TRIANGLE:
			case enums.FabricObjectTypes.ELLIPSE:
				Debug.Assert(false, "LevelEditController.createObject: Unsupported object type");
				break;
			case enums.FabricObjectTypes.RECT:
				
				fObj = new fabric.Rect();
				
				fObj.setHeight(parseInt(params.height.value) * scale);
				fObj.setWidth(parseInt(params.width.value) * scale);
				
				break;
			case enums.FabricObjectTypes.POLYLINE:
			case enums.FabricObjectTypes.POLYGON:
			case enums.FabricObjectTypes.GROUP:
			case enums.FabricObjectTypes.TEXT:
			case enums.FabricObjectTypes.IMAGE:
			case enums.FabricObjectTypes.PATH:
				Debug.Assert(false, "LevelEditController.createObject: Unsupported object type");
				break;
			default:
				Debug.Assert(false, "LevelEditController.createObject: Invalid object type");
		}
		
		if(fObj)
		{
			fObj.hasControls = params.hasControls ? params.hasControls:true;
			fObj.hasRotatingPoint = params.hasRotatingPoint ? params.hasRotatingPoint:true;
			fObj.lockRotation = params.lockRotation ? params.lockRotation:false;
			
			fObj.objDef = objDef;
		}
		
		return fObj;
	}
	encode(fabricObj){
		
	}
	
	syncronize(fabricObj, encodedObj){
		
	}
}

export default angular.module('services.fabricParse', [creatorObjects])
	.service('fabricParse', FabricParse)
	.name;