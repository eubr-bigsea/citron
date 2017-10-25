import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import groupBy from 'lemonade-ember/utils/group-by';
import RSVP from 'rsvp';

export default Route.extend({
  i18n: service(),

  model(params) {
    this._super(...arguments);

    return this.get('store').findRecord('workflow', params.id).then((workflow) => {
      var queryParams = {
        lang: this.get('i18n.locale'),
        platform: workflow.get('platform.id')
      }

      return RSVP.hash({
        workflow,
        clusters: this.get('store').findAll('cluster'),
        operations: this.store.query('operation', queryParams),
        groupedOperations: groupBy(this.store.query('operation', queryParams), 'categories'),
      });
    });
  },

  setupController(controller, model) {
    this._super(controller, model);
    if(!this.get('currentModel.workflow.image')) {
      this.set('currentModel.workflow.image', 'img1.png');
    }
    controller.set('cluster', model.clusters.get('firstObject.id'));
  },

  actions: {
    willTransition(transition){
      var previousTransition = this.controller.get('previousTransition');
      var hasChanged = this.controller.get('hasChanged');
      if(!previousTransition && (transition.targetName !== 'home.jobs.show') && hasChanged){
        this.controller.set('previousTransition', transition);
        transition.abort();
        var modal = {
          title: 'modal.leave.workflow.title',
          message: 'modal.leave.workflow.message',
          submitButton: 'modal.leave.workflow.submitButton',
          cancelButton: 'modal.leave.workflow.cancelButton'
        }

        this.controller.set('modalContent', modal);
        this.controller.set('modal', true);
      }
    }
  }
});
