import angular from 'angular';
import staticData from './StaticData.service';
import GitHubApi from 'github-api';
import config from "../../../config.js";

class GitHub {
	constructor(staticData)
	{
		this.staticData = staticData;
		this.dataRoot = config.dataRoot;
		// basic auth
		this.gh = new GitHubApi({
			username: config.github.userName,
			token: config.github.token
		});
		this.repo = this.gh.getRepo(config.github.owner, config.github.repo);
		
		this.init();
	}

	init(){
	}
	
	
	put(path, content, msg, done, error)
	{
		this.repo.writeFile(config.branch, this.dataRoot+path, content, "MakingApples GitHub.put: "+msg, {}).then(done, error);
	}

	get(path, done, error)
	{
		this.repo.getContents(config.branch, this.dataRoot+path, true).then(done, error);
	}
	
	delete(path, cb)
	{
		this.repo.deleteFile(config.branch, path, false, cb);
	}
	
	update(sha, done, error){
		this.repo.updateHead(config.branch, sha, true).then(done, error);
	}
	
	getCommit(sha, done, error){
		this.repo.getCommit(sha, function(){}).then(done, error);
	}
}

export default angular.module('services.github', [staticData])
	.service('github', GitHub)
	.name;