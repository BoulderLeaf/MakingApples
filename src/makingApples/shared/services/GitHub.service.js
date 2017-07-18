import angular from 'angular';
import GitHubApi from 'github-api';
import config from "./Config.service";
import JS from "../../shared/utils/JS";

class GitHub {
	constructor(config)
	{
		this.gh = null;
		this.repo = null;
		this.appConfig = null;
		this.config = config;
	}
	
	getConfig()
	{
		return new Promise(function(resolve, reject){
			
			if(JS.isValid(this.appConfig))
			{
				resolve(this.appConfig);
			}
			else
			{
				this.config.get().then(function(appConfig) {
					
					this.initRepo(appConfig);
					
					this.appConfig = appConfig;
					resolve(appConfig);
				}.bind(this));
			}
			
		}.bind(this));
	}
	
	initRepo(appConfig)
	{
		this.gh = new GitHubApi({
			username: appConfig.github.userName,
			token: appConfig.github.token
		});
		
		this.repo = this.gh.getRepo(appConfig.github.owner, appConfig.github.repo);
	}
	
	put(path, content, msg, done, error)
	{
		this.getConfig().then(function(){
			this.repo.writeFile(this.appConfig.branch, this.appConfig.dataRoot+path, content, "MakingApples GitHub.put: "+msg, {}).then(done, error);
		}.bind(this));
	}

	get(path, done, error)
	{
		this.getConfig().then(function(){
			this.repo.getContents(this.appConfig.branch, this.appConfig.dataRoot+path, true).then(done, error);
		}.bind(this));
	}
	
	delete(path, cb)
	{
		this.getConfig().then(function(){
			this.repo.deleteFile(this.appConfig.branch, path, false, cb);
		}.bind(this));
	}
	
	update(sha, done, error){
		this.getConfig().then(function(){
			this.repo.updateHead(this.appConfig.branch, sha, true).then(done, error);
		}.bind(this));
	}
	
	getCommit(sha, done, error){
		this.getConfig().then(function(){
			this.repo.getCommit(sha, function(){}).then(done, error);
		}.bind(this));
	}
}

export default angular.module('services.github', [config])
	.service('github', GitHub)
	.name;