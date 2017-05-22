import angular from 'angular';
import github from "./GitHub.service";

class CreatorObjects {
	constructor(github)
	{
		this.github = github;
		this.objects = null;
		this.file = "creatorObjects.json";
	}
	
	createNew()
	{
		
	}
	
	getObjects()
	{
		return new Promise(function(resolve, reject){
			
			function onFetchSuccess(response)
			{
				this.objects = response.data;
				resolve(this.objects);
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
					"Generating Creator Objects",
					onGenerateSuccess.bind(this),
					reject
				);
			}

			function fetch()
			{
				this.github.get(this.file, onFetchSuccess.bind(this), generate.bind(this));
			}
			
			if(this.objects === null)
			{
				fetch.call(this);
			}
			else
			{
				resolve(this.objects);
			}
		}.bind(this));
	}
}

export default angular.module('services.creatorObjects', [github])
	.service('creatorObjects', CreatorObjects)
	.name;