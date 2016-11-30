import DS from 'ember-data';
import Ember from 'ember';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import config from '../config/environment';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  host: `${config.thorn}`,
  session: Ember.inject.service('session'),
  authorizer: 'authorizer:devise',
  headers: Ember.computed('session.data.authenticated', function() {
    var authenticated = this.get('session.data.authenticated');
    return {
      'access-token': authenticated.accessToken,
      'client': authenticated.client,
      'expiry': authenticated.expiry,
      'uid': authenticated.uid
    };
  })
});
