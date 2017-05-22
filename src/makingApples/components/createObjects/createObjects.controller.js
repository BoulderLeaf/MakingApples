export default class CreateObjectsController {
	constructor($scope, creatorObjects) {
		this.creatorObjects = creatorObjects;
		this.$scope = $scope;
		this.data = {};
		
		this.$scope.data = this.data;

		this.initObjects();
	}
	
	initObjects()
	{
		this.creatorObjects.getObjects().then(function(objects){
			this.data.objects = objects;
			this.$scope.$applyAsync();
		}.bind(this));
	}
}