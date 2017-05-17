export default class LevelEditController
{
	constructor($scope, $stateParams, github)
	{
		this.id = $stateParams.levelId;
		this.$scope = $scope;
		this.$scope.id = this.id;
		this.github = github;
		this.data = {};
		this.get();
		this.dir = "levels/";
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
}