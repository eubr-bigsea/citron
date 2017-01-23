import Ember from 'ember';
import groupBy from 'lemonade-ember/utils/group-by';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  model(params) {
    this._super(...arguments);
    return RSVP.hash({
      workflow: this.get('store').findRecord('workflow', params.id),
      operations: groupBy(this.store.findAll('operation'), 'categories')
    });
  },

  actions: {
    willTransition(transition){
      if(!confirm("Are you sure you want to leave this page? All unsaved progress will be lost")){
        transition.abort();
      }
    }
  }
});
