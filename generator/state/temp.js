'use strict';
import controller from './<%= name %>.controller.js';
import template from './<%= name %>.jade';
import './<%= name %>.less';

let configState = ($stateProvider) => {
  $stateProvider.state('<%= name %>', {
    url: '/<%= middleDashName %>',
    views: {
      menuContent: {
        template,
        controller,
        controllerAs: 'vm'
      }
    }
  });
};

configState.$inject = [ '$stateProvider' ];

let <%= camelCaseName %>Module = angular.module('<%= camelCaseName %>', [
  'ionic'
])
.config(configState);

export default <%= camelCaseName %>Module;
