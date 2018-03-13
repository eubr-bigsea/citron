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
          images: [
            {id: 0, name: 'img0.jpg'},
            {id: 1, name: 'img1.jpg'},
            {id: 2, name: 'img2.jpg'},
            {id: 3, name: 'img3.jpg'},
            {id: 4, name: 'img4.jpg'},
            {id: 5, name: 'img5.jpg'},
            {id: 6, name: 'img6.jpg'},
            {id: 7, name: 'img7.jpg'},
            {id: 8, name: 'img8.jpg'},
            {id: 9, name: 'img9.jpg'},
          ],

        });
      }
    );
  },

  setupController(controller, model) {
    this._super(controller, model);
    model.workflow.get('tasks').forEach((task) => {
      task.operation = model.operations.findBy('id', String(task.operation.id)).toJSON({includeId: true});
    })
    controller.send('getAttributeSuggestions');
  },

  actions: {
    willTransition(transition){
      const controller = this.controller;

      controller.set('displayForm', null);
      if(controller.get('hasChanged')){
        controller.set('transition', transition);
        transition.abort();
        controller.set('unsavedModal', true);
      }
      controller.set('selectedTask', null);
    },
    didTransition(){
      this.controller.set('displayForm', null);
    }
  }
});
