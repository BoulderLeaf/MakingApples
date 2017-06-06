import $ from "jquery";
import fabricWebpack from "fabric-webpack";
var LevelEditToolbar = require("./toolbar").default;
import config from "../../../config";

export default class LevelEditController
{
	constructor($scope, $stateParams, github, enums, creatorObjects)
	{
		this.id = $stateParams.levelId;
		this.$scope = $scope;
		this.$scope.id = this.id;
		this.github = github;
		this.data = {};
		this.dir = "levels/";
		this.config = config;
		this.creatorObjects = creatorObjects;
		
		this.$canvas  =$(".level-canvas");
		this.ctx = this.$canvas[0].getContext('2d');
		
		this.setupCanvas(this.$canvas, this.ctx);
		
		this.fabric = new fabricWebpack.fabric.Canvas('canvas');
		this._init();
	}
	
	_init()
	{
		this.creatorObjects.getObjects().then(function(objects){
			this.objects = objects;
			//get level
			this.get();
		}.bind(this));
	}
	
	onLoad(response)
	{
		this.data = response.data;
		this.$scope.$applyAsync();
	}
	
	handleLoadError(error)
	{
		this.generateLevel();
	}
	
	update()
	{
		this.save();
	}
	
	get()
	{
		this.github.get(this.dir+this.id+".json", this.onLoad.bind(this), this.handleLoadError.bind(this));
	}
	
	save()
	{
		this.github.put(
			this.dir+this.id+".json",
			JSON.stringify(this.data),
			"Generating Level Json Data",
			this.saveComplete.bind(this),
			this.handleSaveError.bind(this)
		);
	}
	
	handleSaveError(error)
	{
		console.error("Failed!", error);
	}
	
	saveComplete(e)
	{
		//Save Complete
	}
	
	generateLevel()
	{
		this.save();
	}
	
	setupCanvas($canvas, ctx)
	{
		$canvas.attr("width", 768);
		$canvas.attr("height", 1280);
		
		$canvas.css("width", 768);
		$canvas.css("height", 1280);
		
		ctx.fillStyle="#FF0000";
		ctx.fillRect(0,0,768,1280);
	}
}