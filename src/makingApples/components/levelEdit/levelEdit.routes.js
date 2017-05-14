routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('home.create.edit', {
      url: '/create/edit/{levelId:int}',
      template: require('./levelEdit.html'),
      controller: 'LevelEditController',
      controllerAs: 'levelEdit'
    });
}