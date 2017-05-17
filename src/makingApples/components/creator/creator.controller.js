export default class CreatorController {
	constructor($scope, github) {
		this.github = github;
		this.$scope = $scope;
		
		this.$scope.levels = [];
		
		this.get();
		
		this.data = {};
		this.levels = [];
		
		this.data.levels = this.levels;
	}
	
	onLoad(response)
	{
		this.data = response.data;
		this.levels = this.data.levels;

		this.$scope.levels = this.levels;
		this.$scope.$applyAsync();
	}
	
	handleLoadError(error)
	{
		this.createLevels();
	}
	
	createLevels()
	{
		this.save();
	}
	
	handleCreationError(error)
	{
		console.error("Failed!", error);
	}
	
	save()
	{
		this.github.put(
			"levels.json",
			JSON.stringify(this.data),
			"Generating Levels Json Data",
			this.saveComplete.bind(this),
			this.handleCreationError.bind(this)
		);
	}
	
	get()
	{
		this.github.get("levels.json", this.onLoad.bind(this), this.handleLoadError.bind(this));
	}
	
	saveComplete(e)
	{
		//Save Complete
	}
	
	createNewLevel()
	{
		var name = this.generateUniqueName();
		
		this.data.levels.push({name:name, id:100});
		
		this.$scope.$applyAsync();
	}
	
	generateUniqueName()
	{
		var name = "NewLevel";
		var instances = 0;
		
		this.data.levels.forEach(function(level, i){
			instances+= level.name.slice(0, level.name.length - 3) === name &&
				parseInt(level.name.slice(level.name.length - 3, level.name.length)) === instances
				? 1:0;
		}, this);
		
		var instanceString = instances.toString();
		
		while(instanceString.length < 3)
		{
			instanceString = "0"+instanceString;
		}
		
		return name + instanceString;
	}
}