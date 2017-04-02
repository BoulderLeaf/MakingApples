

routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('creator', {
      url: '/',
      template: require('./creator.html'),
      controller: 'creatorController',
      controllerAs: 'creator'
    });
}