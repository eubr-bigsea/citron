import Ember from 'ember';

export default Ember.Route.extend({
  currentUser: Ember.inject.service('current-user'),
  model(params) {
    this._super(...arguments);

    return params;
  }
});
