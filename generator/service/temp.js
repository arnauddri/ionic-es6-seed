// This file handles the angular factory registration and dependecy injection
import angular from 'angular';
import { <%= upCaseName %>Service } from './<%= name %>.service';

// list your dependencies here found in const <%= name %>Service (dep1, dep2)
<%= upCaseName %>Service.$inject = [];

export default angular.module('<%= camelCaseName %>Module', [])
  .factory('<%= upCaseName %>Service', <%= upCaseName %>Service);
