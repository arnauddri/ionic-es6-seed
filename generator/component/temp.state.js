'use strict';

const configState = ($stateProvider) => {
  $stateProvider.state('<%= name %>', {
    url: '/<%= middleDashName %>',
    views: {
      menuContent: {
        template: '<<%= middleDashName %>></<%= middleDashName %>>'
      }
    }
  });
};

configState.$inject = [ '$stateProvider' ];

export default configState;
