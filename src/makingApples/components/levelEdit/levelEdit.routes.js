routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('home.create.edit', {
      url: '/create/edit/{levelId:string}',
      template: require('./levelEdit.html'),
      controller: 'LevelEditController',
      controllerAs: 'levelEdit'
    });
}