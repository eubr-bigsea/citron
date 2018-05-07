import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  i18n: service(),
  setupController(){
    this.controllerFor('application').set('isLanding', true);
  },
  actions: {
    willTransition(){
      this.controllerFor('application').set('isLanding', false);
    }
  }
});
