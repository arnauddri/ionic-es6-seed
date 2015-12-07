import 'ionic';
import './app.less';
import Common from 'common/common';
import Components from './components/components';
import AppComponent from './app.component';

let appModule = angular.module('app', [
  'ionic',
  Common.name,
  Components.name
])
.directive('appComponent', AppComponent);

export default appModule;
