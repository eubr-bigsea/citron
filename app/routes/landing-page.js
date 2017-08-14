import Ember from 'ember';

export default Ember.Route.extend({
  setupController(){
    this.controllerFor('application').set('isLanding', true);
  },
  actions: {
    willTransition(){
      this.controllerFor('application').set('isLanding', false);
    }
  }
});
