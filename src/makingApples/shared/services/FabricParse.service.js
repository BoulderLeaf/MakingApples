import angular from 'angular';
import enums from "../../../enums.js";
import creatorObjects from "../../shared/services/CreatorObjects.service";
import Debug from "../../shared/utils/Debug";
import JS from "../../shared/utils/JS";
import config from "./Config.service";

class FabricParse {
	constructor(creatorObjects, config)
	{
		this.creatorObjects = creatorObjects;
		this.objects = {};
		this.config = config;
		this.appConfig = null;
		this.init();
	}
	
	init()
	{
		this.creatorObjects.getObjects().then(function(objects){
			this.objects = objects;
		}.bind(this));
		
		this.config.get().then(function(appConfig) {
			this.appConfig = appConfig;
		}.bind(this));
	}
	
	decode(objectId, scale, cb)
	{
		scale  = JS.isValid(scale) ? scale:1;
		
		var objDef = this.objects[objectId];
		var params = objDef.params;
		var fObj = null;
		
		Debug.Assert(params.fabricObjectType, "LevelEditController.createObject: fabricObjectType param not found.");
		
		switch(parseInt(params.fabricObjectType.value))
		{
			case enums.FabricObjectTypes.RECT:
				
				fObj = new fabric.Rect();
				
				fObj.setHeight(parseInt(params.height.value) * scale);
				fObj.setWidth(parseInt(params.width.value) * scale);
				
				if(JS.isValid(cb)) {setTimeout(cb, 0);}
				
				break;
			
			case enums.FabricObjectTypes.IMAGE:
				
				fObj = new fabric.Image();
				
				/** @type {fdfwcdfsdf} */
				function loadComplete()
				{
					fObj.setHeight(params.height.value * scale);
					fObj.setWidth(params.width.value * scale);
					
					if(JS.isValid(cb)) {cb.call();}
				}
				
				var src = this.appConfig.cdn + enums.cdn.OBJECTS+ objectId + enums.FileTypes.PNG;
				fObj.setSrc(src, loadComplete);
				
				break;
				
			case enums.FabricObjectTypes.PATH:
			case enums.FabricObjectTypes.POLYLINE:
			case enums.FabricObjectTypes.POLYGON:
			case enums.FabricObjectTypes.GROUP:
			case enums.FabricObjectTypes.TEXT:
			case enums.FabricObjectTypes.LINE:
			case enums.FabricObjectTypes.CIRCLE:
			case enums.FabricObjectTypes.TRIANGLE:
			case enums.FabricObjectTypes.ELLIPSE:
				Debug.Assert(false, "LevelEditController.createObject: Unsupported object type");
				break;
			default:
				Debug.Assert(false, "LevelEditController.createObject: Invalid object type");
		}
		
		if(JS.isValid(fObj))
		{
			fObj.hasControls = JS.isValid(params.hasControls) ? params.hasControls.value:true;
			fObj.hasRotatingPoint = JS.isValid(params.hasRotatingPoint) ? params.hasRotatingPoint.value:true;
			fObj.lockRotation = JS.isValid(params.lockRotation) ? params.lockRotation.value:false;
			fObj.borderColor = JS.isValid(params.borderColor) ? params.borderColor.value:"#ff0000";

			if(JS.isValid(params.lockScaling))
			{
				fObj.lockScaling = params.lockScaling.value;
				fObj.lockScalingX = params.lockScaling.value;
				fObj.lockScalingY = params.lockScaling.value;
			}
			
			if(JS.isValid(params.fill)){fObj.setFill(params.fill.value);}
			if(JS.isValid(params.opacity)){fObj.setOpacity(params.opacity.value);}
			if(JS.isValid(params.sourcePath)){fObj.setSourcePath(params.sourcePath.value)};
			if(JS.isValid(params.stroke)){fObj.setStroke(params.stroke.value)};
			if(JS.isValid(params.strokeWidth)){fObj.setStrokeWidth(params.strokeWidth.value)};
			
			fObj.objectId = objectId;
		}
		
		return fObj;
	}
	encode(fabricObj, scale)
	{
		var obj = {
			objectId: fabricObj.objectId,
			
			x:fabricObj.left  / scale,
			y:fabricObj.top / scale,
			width:fabricObj.getWidth() / scale,
			height:fabricObj.getHeight() / scale,
			angle:fabricObj.getAngle()
		};
		
		return obj;
	}
	
	syncronize(fabricObj, encodedObj, scale)
	{
		var objDef = this.objects[encodedObj.objectId];
		var params = objDef.params;
		
		fabricObj.setAngle(encodedObj.angle);
		fabricObj.setLeft(encodedObj.x * scale);
		fabricObj.setTop(encodedObj.y * scale);
		
		if(!JS.isValid(params.lockScaling) ||  params.lockScaling !== true){
			fabricObj.setHeight(encodedObj.height * scale);
			fabricObj.setWidth(encodedObj.width * scale);
		}

		return fabricObj;
	}
	
	canEncode(fabricObj)
	{
		return JS.isValid(fabricObj.objectId);
	}
}

export default angular.module('services.fabricParse', [creatorObjects, config])
	.service('fabricParse', FabricParse)
	.name;