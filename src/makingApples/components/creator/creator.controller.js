export default class CreatorController {
  constructor($scope, $state) {
      this.$state = $state;
      $scope.levels=[{name:"thing", id:100}, {name:"thing2", id:1200}, {name:"thing3", id:300}];
  }
editLevel(id) {
    this.$state.go("home.create.edit", id);
  }
}