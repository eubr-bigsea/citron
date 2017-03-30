import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{
  currentUser: Ember.inject.service('current-user'),
  model() {
    return this.store.query('job', { user_id: this.get('currentUser').id });
  },
});
