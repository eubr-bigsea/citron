import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Controller.extend({

  session: service(),
  sessionAccount: service(),

  actions: {
    editCards(id){
      var isChecked = $('#'+ id).is(":checked");
      var user = this.get('model.user');

      if(isChecked){
        this.get('store').findRecord('card',id).then(
          function(card){
            user.get('cards').pushObject(card);
            user.save();
          });
      } else {
        this.get('store').findRecord('card',id).then(
          function(card){
            user.get('cards').removeObject(card);
            user.save();
          });
      }
    },
  }
});
