import angular from 'angular';
import github from "./GitHub.service";

class Levels {
	constructor(github)
	{
		this.github = github;
		this.dir = "levels/";
		this.levels = {};
		this.history = [];
		this.shaTable = {};
	}
	
	_saveHistory()
	{
		this.history.push(JSON.parse(JSON.stringify(this.levels)));
	}
	
	undo()
	{
		this.levels = this.history.pop();
	}
	
	add(id)
	{
		if(this.levels[id] !== undefined){return;}
		this._saveHistory();
		this.levels[id]= {
			objects:[]
		};
	}
	
	delete(id)
	{
		if(this.levels[enumId] === undefined){return;}
		this._saveHistory();
		delete this.levels[id];
	}
	
	save(id)
	{
		if(!this.levels[id] === undefined)
		{
			this.add(id);
		}
		
		return new Promise(function(resolve, reject){
			
			function onFetchSuccess(response)
			{
				resolve(this.levels);
			}
			
			this.github.put(
				this._getFileUrl(id),
				JSON.stringify(this.levels[id]),
				"Saving level registry",
				onFetchSuccess.bind(this),
				reject
			);
		}.bind(this));
	}
	
	get(id)
	{
		return new Promise(function(resolve, reject){
			
			function onFetchSuccess(response)
			{
				this.shaTable[id] = response.sha;
				this.levels[id] = response.data;
				resolve(this.levels[id]);
			}
			
			function onGenerateSuccess(response)
			{
				fetch.call(this);
			}

			function generate()
			{
				this.add(id);
				this.github.put(
					this._getFileUrl(id),
					JSON.stringify(this.levels[id]),
					"Generating Level Data",
					onGenerateSuccess.bind(this),
					reject
				);
			}

			function fetch()
			{
				this.github.get(this._getFileUrl(id), onFetchSuccess.bind(this), generate.bind(this));
			}
			
			if(this.levels[this.id] === undefined)
			{
				fetch.call(this);
			}
			else
			{
				resolve(this.levels);
			}
		}.bind(this));
	}
	
	_getFileUrl(id) {
		return this.dir+id+".json";
	}
}

export default angular.module('services.levels', [github])
	.service('levels', Levels)
	.name;