/* global */
import HomeModule from './home/home'

let componentModule = angular.module('app.components', [
  HomeModule.name
]);

export default componentModule
