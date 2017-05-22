routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
	$stateProvider
	.state('home.createObjects', {
		url: '/createObjects',
		template: require('./createObjects.html'),
		controller: 'CreateObjectsController',
		controllerAs: 'createObjects'
	});
}