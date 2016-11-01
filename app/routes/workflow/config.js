import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  model(params) {
    this._super(...arguments);
    return RSVP.hash({ workflow: this.get('store').findRecord('workflow', params.id), });
  },
  actions:{
    save(){
      var workflow = this.currentModel.workflow;
      workflow.save();
      this.transitionTo('workflow.edit',workflow.id);
    },
  },
});
