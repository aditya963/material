(function() {
  'use strict';

  angular
    .module('material.components.fabTrigger', ['material.core'])
    .directive('mdFabTrigger', MdFabTriggerDirective);

  /**
   * @ngdoc directive
   * @name mdFabTrigger
   * @module material.components.fabSpeedDial
   *
   * @restrict E
   *
   * @description
   * The `<md-fab-trigger>` directive is used inside of a `<md-fab-speed-dial>` or
   * `<md-fab-toolbar>` directive to mark the an element (or elements) as the trigger and setup the
   * proper event listeners.
   *
   * @usage
   * See the `<md-fab-speed-dial>` or `<md-fab-toolbar>` directives for example usage.
   */
  function MdFabTriggerDirective() {
    return {
      restrict: 'E',

      require: ['^?mdFabSpeedDial', '^?mdFabToolbar'],

      link: function(scope, element, attributes, controllers) {
        var parent, controller;

        // Add basic aria attributes
        element.attr('aria-haspopup', true);

        // Grab the relevant parent
        parent = element.parent('md-fab-speed-dial') || element.parent('md-fab-toolbar');

        if (parent) {
          // Watch the isolate scope for changes to isOpen
          // TODO: Use events and/or fix this when we combine all of this into a single component
          parent.isolateScope().$watch('vm.isOpen', function(isOpen) {
            element.attr('aria-expanded', isOpen);
          });
        }

        // Grab whichever parent controller is used
        controller = controllers[0] || controllers[1];

        if (controller) {
          angular.forEach(element.children(), function(child) {
            angular.element(child).on('click', controller.toggle);
          });
        }
      }
    }
  }
})();

