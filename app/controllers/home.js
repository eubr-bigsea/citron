import Ember from 'ember';

const { inject: { service }, Component } = Ember;

export default Ember.Controller.extend({

  session: service(),
  sessionAccount: service(),

  actions: {
    editCards(id, checked){
      var isChecked = $('#'+ id).is(":checked");
      var user = this.get('model.user');

      if(isChecked){
        this.get('store').findRecord('card',id).then(
          function(card){
            user.get('cards').pushObject(card);
            user.save();
          },
          function(){ errors.push(checked[i].id); }
        );
      } else{
        this.get('store').findRecord('card',id).then(
          function(card){
            user.get('cards').removeObject(card);
            user.save();
          },
          function(){ errors.push(checked[i].id); }
        );
      }
    },
  }
});
