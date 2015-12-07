'use strict';

import homeComponent from './home.component.js';
import configState from './home.state.js';

let homeModule = angular.module('home', [
  'ionic'
])
.config(configState)
.directive('home', homeComponent);

export default homeModule;
