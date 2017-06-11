export default class CreatorController {
	constructor($scope, github, levelRegistry) {
		this.github = github;
		this.levelRegistry = levelRegistry;
		
		this.$scope = $scope;
		
		this.$scope.levels = [];
		
		this.data = {};
		this.levels = [];
		
		this.levelNameInput = "NewLevelName";
		this.widthInput = 10;
		this.heightInput = 10;
		this.scale = 1;
		
		this.init();
	}
	
	init(){
		this.levelRegistry.get().then(function(levels){
			this.levels = levels;
			this.levelNameInput = this.generateUniqueName();
			this.$scope.$applyAsync();
		}.bind(this));
	}
	
	save()
	{
		this.levelRegistry.save();
	}
	
	createNewLevel()
	{
		var name = this.levelNameInput;
		this.levelRegistry.add(name, this.widthInput, this.heightInput, this.scale);
		this.$scope.$applyAsync();
	}
	
	generateUniqueName()
	{
		var name = "NewLevel";
		var instances = 0;

		for(var levelId in this.levels)
		{
			instances+= levelId.slice(0, levelId.length - 3) === levelId &&
				parseInt(levelId.slice(levelId.length - 3, levelId.length)) === instances
				? 1:0;
		}
		
		var instanceString = instances.toString();
		
		while(instanceString.length < 3)
		{
			instanceString = "0"+instanceString;
		}
		
		return name + instanceString;
	}
}