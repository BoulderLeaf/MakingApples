routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('header', {
      url: '/',
      template: require('./header.html'),
      controller: 'HeaderController',
      controllerAs: 'header'
    });
}