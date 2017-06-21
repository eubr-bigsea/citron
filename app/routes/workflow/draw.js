import Ember from 'ember';
import groupBy from 'lemonade-ember/utils/group-by';
import RSVP from 'rsvp';

const { inject: { service } } = Ember

export default Ember.Route.extend({
  i18n: service(),

  model(params) {
    this._super(...arguments);

    var queryParams = {
      platform: params.platform,
      lang: this.get('i18n.locale')
    }

    return RSVP.hash({
      workflow: this.get('store').findRecord('workflow', params.id),
      operations: this.store.query('operation', queryParams),
      groupedOperations: groupBy(this.store.query('operation', queryParams), 'categories'),
    });
  },

  setupController(controller, model) {
    this._super(controller, model);
    if(!this.get('currentModel.workflow.image')) {
      this.set('currentModel.workflow.image', 'img1.png');
    }
  },

  actions: {
    willTransition(transition){
      var previousTransition = this.controller.get('previousTransition');
      var hasChanged = this.controller.get('hasChanged');
      if(!previousTransition && (transition.targetName !== 'job.show') && hasChanged){
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
