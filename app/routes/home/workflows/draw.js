import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import groupBy from 'lemonade-ember/utils/group-by';
import RSVP from 'rsvp';

export default Route.extend({
  i18n: service(),

  model(params) {
    this._super(...arguments);

    return this.get('store').findRecord('workflow', params.id).then(
      (workflow) => {
        const lang =  this.get('i18n.locale');
        const platform = workflow.get('platform.id');

        const queryParams = { lang, platform };

        return RSVP.hash({
          workflow,
          clusters: this.get('store').findAll('cluster'),
          operations: this.store.query('operation', queryParams),
          groupedOperations: groupBy(this.store.query('operation', queryParams), 'categories'),
        });
      }
    );
  },

  actions: {
    willTransition(transition){
      const controller = this.controller;

      if(controller.get('hasChanged')){
        controller.set('transition', transition);
        transition.abort();
        controller.set('unsavedModal', true);
      }
    }
  }
});
