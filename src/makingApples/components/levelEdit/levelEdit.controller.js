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
		this.levels.save(this.id);
		this.levelRegistry.save();
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
	
	decode(){
		
		var output = {
			geometry:[],
			objects:[]
		};
		
		this.fabric.forEachObject(function(obj){
			
			this.fabricParse.encode(obj);
			//itterate over objects and write them to output. Will represent the level data
			
		}, this);
	}
}