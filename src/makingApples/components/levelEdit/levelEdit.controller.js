export default class LevelEditController
{
	constructor($scope, $stateParams, github)
	{
		this.id = $stateParams.levelId;
		$scope.id = this.id;
		this.github = github;
	}
	
	update()
	{
		this.github.put("test.txt", "Hello World: "+this.id, "Updating level");
	}
}