'use strict';

import <%= camelCaseName %>Component from './<%= name %>.component.js';
import configState from './<%= name %>.state.js';

let <%= camelCaseName %>Module = angular.module('<%= camelCaseName %>', [
  'ionic'
])
.config(configState)
.directive('<%= camelCaseName %>', <%= camelCaseName %>Component);

export default <%= camelCaseName %>Module;
