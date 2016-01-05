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
    // Used to initially show and hide components:
    $scope.hasAssocPoem = Boolean($attrs.name);
    // Both only initiated when needed:
    $scope.colouredProse = null;
    $scope.rawText = null;

    $scope.convertToPostion = function (index) {
      return index * ($scope.dim + 2);
    };

    $scope.processRawText = function () {
      if(this.rawText && this.rawText.length > 0){
        var colouredProse = getColouredProse();
        colouredProse.processText(this.rawText);
        $scope.syllabelisedText = colouredProse.syllabelisedText;
        $scope.colourisedText = colouredProse.colourisedText;
        $scope.dataPresent = true;
      }
      else {
        $scope.dataPresent = false;
      }
    };

    $scope.init = function () {
      if($attrs.name){
        var undrScrdName = $attrs.name.replace(/\s/g, '_');
        var baseUrl = $attrs.outputsrc;
        $scope.poemTitle = $attrs.name;

        $http({
          method: 'GET',
          url: baseUrl + undrScrdName + '-syllabelised.json'
        }).success(function(data) {
          $scope.syllabelisedText = data;
        }).error(function(data) {
          console.error(data);
        });

        $http({
          method: 'GET',
          url: baseUrl + undrScrdName + '-colourised.json'
        }).success(function(data) {
          $scope.colourisedText = data;
          $scope.dataPresent = true;
        }).error(function(data) {
          console.error(data);
        });
      }
    };
    $scope.init();

    var getColouredProse = function () {
      if(!this.colouredProse) {
        this.colouredProse = new ColouredProse('a,e,i,o,u,y'.split(','));
      }
      return this.colouredProse;

    }
}]);
