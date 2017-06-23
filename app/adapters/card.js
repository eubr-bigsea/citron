import ApplicationAdapter from './application';
import config from '../config/environment';
import Ember from 'ember';

export default ApplicationAdapter.extend({
  namespace: 'api',
  host: `${config.thorn}`,
});
