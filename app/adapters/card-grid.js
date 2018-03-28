import ApplicationAdapter from './application';
import config from '../config/environment';
import { underscore } from '@ember/string';
import { pluralize } from 'ember-inflector'

export default ApplicationAdapter.extend({
  namespace: 'api',
  host: `${config.thorn}`,
  pathForType: function(type) {
    return pluralize(underscore(type));
  }
});
