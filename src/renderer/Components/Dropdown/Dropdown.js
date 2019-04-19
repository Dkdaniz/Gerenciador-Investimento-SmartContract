module.exports = [function () {
  return {
    template: `<div class="dropdown" ng-class="{'is-active': opened}">
      <div class="dropdown-trigger">
          <button class="button" ng-click="toggle($event)" aria-haspopup="true" aria-controls="dropdown-menu">
              <span>{{ text }}</span>
              <span class="icon is-small">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
          </button>
      </div>
      <div class="dropdown-menu" id="dropdown-menu" role="menu">
          <div class="dropdown-content">
            <ng-transclude></ng-transclude>
          </div>
      </div>
    </div>`,
    transclude: true,
    scope: {
      text: '@'
    },
    link: function (scope, element) {

      scope.opened = false;

      scope.toggle = function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        
        scope.opened = !scope.opened;
      }
      
      angular.element(document).on('click', function () {
        scope.$apply(() => {
          scope.opened = false;
        });
      });

    }
  }
}];