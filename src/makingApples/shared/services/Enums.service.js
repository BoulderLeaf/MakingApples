import angular from 'angular';
import github from "./GitHub.service";
import config from "../../../config.js";

class Enums {
	constructor(github)
	{
		this.github = github;
		this.dir="";
		this.enums = null;
	}
	
	createNew()
	{
		
	}
	
	getEnums()
	{
		return new Promise(function(resolve, reject){
			
			function onFetchSuccess(response)
			{
				this.enums = response.data;
				resolve(this.enums);
			}
			
			function onGenerateSuccess(response)
			{
				fetchEnums.call(this);
			}

			function generateEnums()
			{
				this.github.put(
					this.dir+"enums.json",
					JSON.stringify({}),
					"Generating Enums Data",
					onGenerateSuccess.bind(this),
					reject
				);
			}

			function fetchEnums()
			{
				this.github.get(this.dir+"enums.json", onFetchSuccess.bind(this), generateEnums.bind(this));
			}
			
			if(this.enums === null)
			{
				fetchEnums.call(this);
			}
			else
			{
				resolve(this.enums);
			}
		}.bind(this));
	}
}

export default angular.module('services.enums', [github])
	.service('enums', Enums)
	.name;