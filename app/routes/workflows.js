import Ember from 'ember';

export default Ember.Route.extend({
  currentUser: Ember.inject.service('current-user'),

  model() {
    var params = {
      user_id: this.get('currentUser').id,
      enabled: true,
      platform: 'spark'
    };

    return this.store.query('workflow', params );
  },
});
