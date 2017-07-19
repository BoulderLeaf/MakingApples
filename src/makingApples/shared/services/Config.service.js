import angular from 'angular';
import JS from "../../shared/utils/JS";

class Config {
	constructor($http, $location)
	{
		this.$http = $http;
		this.$location = $location;
		this.config = null;
		this.api = "creatorObjects.json";
	}
	
	get()
	{
		return new Promise(function(resolve, reject){
			
			if(JS.isValid(this.config))
			{
				resolve(this.config);
			}
			else
			{
				this.$http.get("makingapples/services/readConfig.php")
					.then(function(response){
					
					this.config = response.data;
					resolve(this.config);
					
				}.bind(this));
			}
			
		}.bind(this));
	}
}

export default angular.module('services.config', [])
	.service('config', Config)
	.name;