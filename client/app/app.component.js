import template from './app.jade'
import './app.less'

let appComponent = () => {
  return {
    template,
    restrict: 'E'
  }
}

export default appComponent
