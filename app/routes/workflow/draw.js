import Ember from 'ember';
import groupBy from 'lemonade-ember/utils/group-by';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  model(params) {
    this._super(...arguments);
    return RSVP.hash({
      workflow: this.get('store').findRecord('workflow', params.id),
      operations: groupBy(this.store.query('operation',{platform: params.platform}), 'categories')
    });
  },

  actions: {
    willTransition(transition){
      var targetName = this.controller.get('targetName');
      if(!targetName){
        this.controller.set('targetName', transition.targetName);
        transition.abort();
        $('#confirm-modal').addClass('show');
      }
    }
  }
});
