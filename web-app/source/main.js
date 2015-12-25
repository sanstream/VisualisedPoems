var VisualisedPoems = angular.module('VisualisedPoems',[],
  function($interpolateProvider) {
    // providing custom template variable delimeters,
    // otherwise it conflicts with jekyll's tags:
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
  }
);

VisualisedPoems.controller('VisualisedPoem',['$scope', '$attrs', '$http',
  function ($scope, $attrs, $http){

    $scope.syllabelisedText = null;
    $scope.colourisedText = null;

    $scope.init = function () {
      if($attrs.name){
        $http({
          method: 'GET',
          url: '/post-resources/VisualisedPoems/node-app/output/' + $attrs.name.replace(/\s/g, '_') + '-syllabelised.json'
        }).success(function(data) {
          $scope.syllabelisedText = data;
        }).error(function(data) {
          console.error(data);
        });
      }
    };
    $scope.init();
}]);
