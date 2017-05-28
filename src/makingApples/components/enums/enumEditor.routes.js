routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
	$stateProvider
		.state('home.enumEditor', {
			url: '/enumEditor',
			template: require('./enumEditor.html'),
			controller: 'EnumEditorController',
			controllerAs: 'enumEditor'
		});
}