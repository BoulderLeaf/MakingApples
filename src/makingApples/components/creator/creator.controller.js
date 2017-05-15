export default class CreatorController {
	constructor($scope, github) {
		this.github = github;
		this.$scope = $scope;
		this.github.get("levels.json", this.onLoad.bind(this), this.handleLoadError.bind(this));
		this.$scope.levels = [];
	}
	
	onLoad(hasFile)
	{
		this.$scope.levels.push({name:"thing", id:100});
		//this.$scope.levels=[{name:"thing", id:100}, {name:"thing2", id:1200}, {name:"thing3", id:300}];
		this.$scope.$applyAsync();
	}
	
	handleLoadError(error)
	{
		this.createLevels();
	}
	
	createLevels(){
		
		this.github.put(
			"levels.json",
			"{levels:[]}",
			"Generating Levels Json Data",
			this.onLoad.bind(this),
			this.handleCreationError.bind(this)
		);
	}
	
	handleCreationError(error)
	{
		console.error("Failed!", error);
	}
}