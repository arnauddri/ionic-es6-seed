'use strict';

const configState = ($stateProvider) => {
  $stateProvider.state('home', {
    url: '/home',
    views: {
      menuContent: {
        template: '<home></home>'
      }
    }
  });
};

configState.$inject = [ '$stateProvider' ];

export default configState;
