import ApplicationAdapter from './application';
import config from '../config/environment';
import { underscore } from '@ember/string';
import Ember from 'ember';

export default ApplicationAdapter.extend({
  namespace: 'api',
  host: `${config.thorn}`,
  pathForType: function(type) {
    return Ember.String.pluralize(underscore(type));
  }
});
