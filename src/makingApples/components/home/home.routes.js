routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('home', {
      name: 'home',
      url: '/makingapples',
      template: require('./home.html'),
      controller: 'HomeController',
      controllerAs: 'home'
    });
}