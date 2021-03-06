var VisualisedPoems = angular.module('VisualisedPoems',[],
  function($interpolateProvider) {
    // providing custom template variable delimeters,
    // otherwise it conflicts with jekyll's tags:
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
  }
);

VisualisedPoems.filter('highlight', function() {
  return function(isHighlighted) {
    return isHighlighted ? 'highlight' : '';
  };
});

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

    $scope.processRawText = function () {
      if(this.rawText && this.rawText.length > 0){
        var colouredProse = getColouredProse();
        colouredProse.processText(this.rawText);
        $scope.syllabelisedText = decorate(colouredProse.syllabelisedText);
        $scope.colourisedText = decorate(colouredProse.colourisedText);
        $scope.dataPresent = true;
      }
      else {
        $scope.syllabelisedText = null;
        $scope.colourisedText = null;
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
          $scope.syllabelisedText = decorate(data);
        }).error(function(data) {
          console.error(data);
        });

        $http({
          method: 'GET',
          url: baseUrl + undrScrdName + '-colourised.json'
        }).success(function(data) {
          $scope.colourisedText = decorate(data);
          $scope.dataPresent = true;
        }).error(function(data) {
          console.error(data);
        });
      }
    };

    $scope.highlightSyllable = function (parentIdx, idx, state) {
      this.colourisedText[parentIdx][idx]['isHighlighted'] = state;
      this.syllabelisedText[parentIdx][idx]['isHighlighted'] = state;
    }

    $scope.init();

    var getColouredProse = function () {
      if(!this.colouredProse) {
        this.colouredProse = new ColouredProse('a,e,i,o,u,y'.split(','));
      }
      return this.colouredProse;

    };

    /**
     * Decorates the raw data with some extra properties
     * @param  {Array[]} rawData A nested array of which the elements of the nested arrays get decorated.
     * @return {Array[]}      The decorated version of the data.
     */
    decorate = function (rawData) {
      return rawData.map(function (line) {
        return line.map(function (syllable) {
          return {
            data: syllable,
            isHighlighted: false
          };
        });
      });
    }
}]);

VisualisedPoems.directive('syncscroll', [function(){
	var scrollTop = 0;
	function combine(elements){

    var elements = Array.prototype.slice.call(elements);

    elements.forEach(function (element) {
      element.addEventListener('scroll', function(e){

  				scrollTop = e.target.scrollTop;
  				elements.forEach(function (element) {
  					if( element !== e.target ){
              element.scrollTop = scrollTop;
  					}
  				});
      });
  	});
	}

	return {
		restrict: 'A',
		replace: false,
		compile: function(element, attrs){
			combine(element[0].querySelectorAll('.'+attrs.syncscroll));
		}
	};
}]);
