'use strict';

import template from './<%= name %>.jade';
import controller from './<%= name %>.controller.js';
import './<%= name %>.less';

let <%= camelCaseName %>Component = function () {
  return {
    template,
    controller,
    restrict: 'E',
    controllerAs: 'vm',
    bindToController: true
  };
};

export default <%= camelCaseName %>Component;
