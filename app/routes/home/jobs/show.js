import { A } from '@ember/array';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default Route.extend({
  i18n: service(),

  model(params) {
    let queryParams = {
      lang: this.get('i18n.locale')
    };

    return RSVP.hash({
      job: this.store.findRecord('job', params.id),
      operations: this.store.query('operation', queryParams)
    });
  },
  setupController(controller){
    this._super(...arguments);
    controller.set('stepsLogs', A());
  }
});
