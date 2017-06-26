import $ from "jquery";
import enums from "../../../enums";
import fabricWebpack from "fabric-webpack";
var fabric = fabricWebpack.fabric;
var LevelEditToolbar = require("./toolbar").default;
import config from "../../../config";
import Debug from "../../shared/utils/Debug";

export default class LevelEditController
{
	constructor($scope, $stateParams, enums, creatorObjects, fabricParse, levels, levelRegistry)
	{
		this.id = $stateParams.levelId;
		this.$scope = $scope;
		this.$scope.id = this.id;
		this.config = config;
		this.fabricParse = fabricParse;
		this.creatorObjects = creatorObjects;
		this.levels = levels;
		this.levelRegistry = levelRegistry;
		this.objects = {};
		this.registry = {};
		this.level = {};
		
		this.$canvas  =$(".level-canvas");
		this.ctx = this.$canvas[0].getContext('2d');
		
		this._init();
	}
	
	_init()
	{
		var fetchCount = 3;
		
		function onComplete()
		{
			if(--fetchCount <= 0)
			{
				this.onLoad();
			}
		}
		
		this.creatorObjects.getObjects().then(function(objects){
			this.objects = objects;
			onComplete.call(this);
		}.bind(this));
		
		this.levelRegistry.get().then(function(registry){
			this.registry = registry;
			onComplete.call(this);
		}.bind(this));
		
		this.levels.get(this.id).then(function(level){
			this.level = level;
			onComplete.call(this);
		}.bind(this));
	}
	
	onLoad()
	{
		this.setupCanvas(this.$canvas, this.ctx);
		
		this.fabric = new fabric.Canvas('canvas');
		this.setupFabric(this.fabric);
		
		this.decode();
		
		this.$scope.$applyAsync();
	}
	
	loadLevel()
	{
		this.levels.get(this.id).then(function(level){
			this.onLoad(level);
		}.bind(this));
	}
	
	save()
	{
		this.level.objects = this.encode();
		
		this.levels.save(this.id).then(function(){
			
			this.levels.get(this.id).then(function(level){
				this.level = level;
				this.decode();
				this.levelRegistry.save();
			}.bind(this));
			
		}.bind(this));
	}
	
	setupCanvas($canvas, ctx)
	{
		var width = this.registry[this.id].width * this.registry[this.id].scale;
		var height = this.registry[this.id].height * this.registry[this.id].scale;
		
		$canvas.attr("width", width);
		$canvas.attr("height", height);
		
		$canvas.css("width", width);
		$canvas.css("height", height);
		
		ctx.fillStyle="#FF0000";
		ctx.fillRect(0,0,width,height);
	}
	
	setupFabric(fabric)
	{
		fabric.setBackgroundColor({source:config.cdn+"canvasBackgroundImage.png"}, fabric.renderAll.bind(fabric));
	}
	
	createObject(objectId)
	{
		var fObj = this.fabricParse.decode(objectId, this.registry[this.id].scale, onObjLoaded.bind(this));
		
		function onObjLoaded()
		{
			fObj.center();
			fObj.setCoords();
			
			this.fabric.calcOffset();
			this.fabric.renderAll();
		}
		
		this.fabric.add(fObj);
	}
	
	decode()
	{
		this.fabric.clear();
		
		var objects = this.level.objects;
		var objCount = objects.length;
		
		function onObjLoaded(fObj)
		{
			if(--objCount >0) { return; }
			
			this.fabric.calcOffset();
			this.fabric.renderAll();
		}
		
		objects.forEach(function(obj){
			
			var fObj = this.fabricParse.decode(obj.objectId, this.registry[this.id].scale, onObjLoaded.bind(this));
			this.fabricParse.syncronize(fObj, obj);
			fObj.setCoords();
			this.fabric.add(fObj);
			
		}, this)
	}
	
	encode()
	{
		
		var output = [];
		
		this.fabric.forEachObject(function(obj){
			
			output.push(this.fabricParse.encode(obj));
			
		}, this);
		
		return output;
	}
}