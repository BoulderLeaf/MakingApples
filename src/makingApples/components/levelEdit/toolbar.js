export default function($scope, fabric, enums) {
	
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
};