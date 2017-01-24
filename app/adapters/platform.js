import DS from 'ember-data';
import Ember from 'ember';

export default DS.JSONAPIAdapter.extend({
  host: 'http://beta.ctweb.inweb.org.br/tahiti',
  session: Ember.inject.service('session'),
  headers: Ember.computed('session.data.authenticated', function() {
    var authenticated = this.get('session.data.authenticated');
    return {
      'X-Auth-Token': '123456',
      'access-token': authenticated.accessToken,
      'client': authenticated.client,
      'expiry': authenticated.expiry,
      'uid': authenticated.uid
    };
  })
});

