import angular from 'angular';
import github from "./GitHub.service";
import enums from "./Enums.service";

class CreatorObjects {
	constructor(github, enums)
	{
		this.github = github;
		this.enums = enums;
		this.objectDefTypes = null;
		this.defs = null;
		this.enumName = 'ObjectDefTypes';
		this.file = "objectDefs.json";
		this.defTypes = null;
		this.init();
	}
	
	init()
	{
		this.enums.getEnums().then(function(enums){
			
			this.defTypes = enums[this.enumName];
			
			if(this.defTypes === null)
			{
				this.enums.createNew(this.enumName, {}).then(function(enums){
					this.objectDefTypes = enums[this.enumName];
					this.populate();
				}.bind(this));
			}
			else
			{
				this.populate();
			}
		});
	}
	
	getDefs()
	{
		return new Promise(function(resolve, reject){
			
			function onFetchSuccess(response)
			{
				this.defs = response.data;
				resolve(this.defs);
			}
			
			function onGenerateSuccess(response)
			{
				fetch.call(this);
			}

			function generate()
			{
				this.github.put(
					this.file,
					JSON.stringify({}),
					"Generating Object Defs",
					onGenerateSuccess.bind(this),
					reject
				);
			}

			function fetch()
			{
				this.github.get(this.file, onFetchSuccess.bind(this), generate.bind(this));
			}
			
			if(this.defs === null)
			{
				fetch.call(this);
			}
			else
			{
				resolve(this.defs);
			}
		}.bind(this));
	}
}

export default angular.module('services.creatorObjects', [github, enums])
	.service('creatorObjects', CreatorObjects)
	.name;