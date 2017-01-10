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

  bla() {
    console.log('bla');
  },

  actions: {
    willTransition(transition){
      var temp = transition.targetName;
      transition.abort();
      $('#confirm-modal').addClass('show');

      Ember.$('#proceed').click(function(temp) {
        console.log(this.temp);
      });

      Ember.$('#cancel').click(() => {
        $('#confirm-modal').removeClass('show');
      });



    }


  }

});
