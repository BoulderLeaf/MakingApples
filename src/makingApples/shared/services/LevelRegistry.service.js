import angular from 'angular';
import github from "./GitHub.service";

class LevelRegistry {
	constructor(github)
	{
		this.github = github;
		this.file = "levels.json";
		this.levels = null;
		this.history = [];
	}
	
	_saveHistory()
	{
		this.history.push(JSON.parse(JSON.stringify(this.levels)));
	}
	
	undo()
	{
		this.levels = this.history.pop();
	}
	
	add(id, width, height, scale)
	{
		if(this.levels[id] !== undefined){return;}
		this._saveHistory();
		this.levels[id]= {
			width:width,
			height:height,
			scale:scale,
			appleCount:0
		};
	}
	
	delete(id)
	{
		if(this.levels[id] === undefined){return;}
		this._saveHistory();
		delete this.levels[id];
	}
	
	save()
	{
		return new Promise(function(resolve, reject){
			
			function onFetchSuccess(response)
			{
				resolve(this.levels);
			}
			
			function onGenerateSuccess(response)
			{
				this.github.get(this.file, onFetchSuccess.bind(this), reject);
			}
			
			this.github.put(
				this.file,
				JSON.stringify(this.levels),
				"Saving level registry",
				onGenerateSuccess.bind(this),
				reject
			);
		}.bind(this));
	}
	
	get()
	{
		return new Promise(function(resolve, reject){
			
			function onFetchSuccess(response)
			{
				this.levels = response.data;
				resolve(this.levels);
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
					"Generating Level Registry Data",
					onGenerateSuccess.bind(this),
					reject
				);
			}

			function fetch()
			{
				this.github.get(this.file, onFetchSuccess.bind(this), generate.bind(this));
			}
			
			if(this.levels === null)
			{
				fetch.call(this);
			}
			else
			{
				resolve(this.levels);
			}
		}.bind(this));
	}
}

export default angular.module('services.levelRegistry', [github])
	.service('levelRegistry', LevelRegistry)
	.name;