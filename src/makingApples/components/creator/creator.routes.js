routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
	$stateProvider
		.state('home.create', {
			url: '/create',
			template: require('./creator.html'),
			controller: 'CreatorController',
			controllerAs: 'creator'
		});
}