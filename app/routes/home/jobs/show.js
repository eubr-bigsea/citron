import Ember from 'ember';
import RSVP from 'rsvp';

const { inject: { service } } = Ember

export default Ember.Route.extend({
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
    controller.set('stepsLogs', Ember.A());
  }
});
