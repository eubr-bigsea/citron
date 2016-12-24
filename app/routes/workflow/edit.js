import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    this._super(...arguments);
    return  this.get('store').findRecord('workflow', params.id);
  },
  actions: {
    save() {
      var workflow = this.currentModel;
      this.transitionTo('workflow.edit', workflow.id);
    }
  }
});
