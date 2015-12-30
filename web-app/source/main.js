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
    $scope.dataPresent = false;

    $scope.convertToPostion = function (index) {
      return index * ($scope.dim + 2);
    };

    $scope.init = function () {
      if($attrs.name){
        var undrScrdName = $attrs.name.replace(/\s/g, '_');

        $http({
          method: 'GET',
          url: '/post-resources/VisualisedPoems/node-app/output/' + undrScrdName + '-syllabelised.json'
        }).success(function(data) {
          $scope.syllabelisedText = data;
        }).error(function(data) {
          console.error(data);
        });

        $http({
          method: 'GET',
          url: '/post-resources/VisualisedPoems/node-app/output/' + undrScrdName + '-colourised.json'
        }).success(function(data) {
          $scope.colourisedText = data;
          $scope.dataPresent = true;
        }).error(function(data) {
          console.error(data);
        });
      }
    };
    $scope.init();
}]);
