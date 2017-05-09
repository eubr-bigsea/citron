import ApplicationAdapter from './application';
import config from '../config/environment';
import Ember from 'ember';

export default ApplicationAdapter.extend({
  namespace: 'api',
  host: `${config.thorn}`,
  // allows the multiword paths in urls to be underscored
  pathForType: function(type) {
    var underscored = Ember.String.underscore(type);
    return Ember.String.pluralize(underscored);
  },
  shouldReloadAll() {
    return true;
  },
  shouldBackgroundReloadRecord() {
    return true;
  },

});
