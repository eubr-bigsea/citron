import Route from '@ember/routing/route';

export default Route.extend({
  setupController(){
    this.controllerFor('application').set('isLanding', true);
  },
  actions: {
    willTransition(){
      this.controllerFor('application').set('isLanding', false);
    }
  }
});
