export default class CreateObjectsController {
	constructor($scope, creatorObjects) {
		this.creatorObjects = creatorObjects;
		this.$scope = $scope;
		this.objects = {};
		
		this.$scope.data = this.data;
		this.$scope.objectId = "new_object_name";
		this.$scope.defs = [];

		this.initObjects();
	}
	
	initObjects()
	{
		this.creatorObjects.getObjects().then(function(objects){
			this.objects = objects;
			//this.$scope.$applyAsync();
		}.bind(this));
	}
	
	createNew(){
		this.creatorObjects.generateNewObject(this.$scope.objectName).then(function(){
			this.$scope.$applyAsync();
		}.bind(this));
	}
	
	deleteObject(id){
		this.creatorObjects.deleteObject(id).then(function(){
			this.$scope.$applyAsync();
		}.bind(this));
	}
}