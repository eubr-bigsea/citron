import Ember from 'ember';

export default Ember.Route.extend({
  currentUser: Ember.inject.service('current-user'),
  model() {
    return this.store.query('job', { user_id: this.get('currentUser').id });
  },
});
