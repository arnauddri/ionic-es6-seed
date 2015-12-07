'use strict';

import template from './home.jade';
import controller from './home.controller.js';
import './home.less';

let homeComponent = function () {
  return {
    template,
    controller,
    restrict: 'E',
    controllerAs: 'vm',
    bindToController: true
  };
};

export default homeComponent;
