import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
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
