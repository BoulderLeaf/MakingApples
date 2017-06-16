import angular from 'angular';
import github from "./GitHub.service";
import config from "../../../config.js";

class Enums {
	constructor(github)
	{
		this.github = github;
		this.file = "enums.json";
		this.enums = null;
		this.history = [];
	}
	
	_saveHistory()
	{
		this.history.push(JSON.parse(JSON.stringify(this.enums)));
	}
	
	undo()
	{
		this.enums = this.history.pop();
	}
	
	addValue(enumId, key, value)
	{
		key = key.toUpperCase();
		if(this.enums[enumId] === undefined){return;}
		if(this.enums[enumId][key] !== undefined){return;}
		this._saveHistory();
		this.enums[enumId][key] = value;
	}
	
	deleteValue(enumId, key)
	{
		if(this.enums[enumId] === undefined){return;}
		this._saveHistory();
		delete this.enums[enumId][key];
	}
	
	createNew(enumId)
	{
		if(this.enums[enumId] !== undefined){return;}
		this._saveHistory();
		this.enums[enumId] = {};
	}
	
	delete(enumId)
	{
		if(this.enums[enumId] === undefined){return;}
		this._saveHistory();
		delete this.enums[enumId];
	}
	
	save()
	{
		return new Promise(function(resolve, reject){
			
			function onFetchSuccess(response)
			{
				resolve(this.enums);
			}
			
			function onGenerateSuccess(response)
			{
				this.github.get(this.file, onFetchSuccess.bind(this), reject);
			}
			
			this.github.put(
				this.file,
				JSON.stringify(this.enums),
				"Creating new enum",
				onGenerateSuccess.bind(this),
				reject
			);
		}.bind(this));
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
					this.file,
					JSON.stringify({}),
					"Generating Enums Data",
					onGenerateSuccess.bind(this),
					reject
				);
			}

			function fetchEnums()
			{
				this.github.get(this.file, onFetchSuccess.bind(this), generateEnums.bind(this));
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