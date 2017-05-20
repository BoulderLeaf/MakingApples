export default class HomeController {
	constructor($scope) {
		this.name = 'World';

		$scope.tabs = [
			{name:"Home", state:"home"},
			{name:"Edit Levels", state:"home.create"}
		];
	}

	changeName() {
		this.name = 'angular-tips';
	}
}