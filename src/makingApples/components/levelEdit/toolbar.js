

export default function($scope, fabric, enums, creatorObjects) {
	
	this.$scope = $scope;
	this.fabric = fabric;
	
	this.objects = [];
	
	this.$scope.toolbar = {
		objects:this.objects
	};
	
	enums.getEnums().then(function(response){
		if(response)
		{
			this.objects = response.objects;
		}
	}.bind(this))
	
	_init();
	
	function _init()
	{
		creatorObjects.getObjects().then(function(objects){
			this.$scope.toolbar.objects = objects;
			this.$scope.$applyAsync();
		}.bind(this));
	}
};