import Ember from 'ember';

const { inject: { service }, Component } = Ember;

export default Ember.Controller.extend({

  session: service(),
  sessionAccount: service(),


  actions: {
    submit(){
      var user = this.get('model.user');
      var errors = [];
      var checked = $(":checkbox:checked");
      this.set('selectedWorkflows', checked.length);

      if(checked.length){
        for (var i=0; i<checked.length; i++){
          this.get('store').findRecord('card',checked[i].id).then(
            function(card){
              user.get('cards').pushObject(card);
              user.save();
              debugger
            },
            function(){ errors.push(checked[i].id); }
          );
        }
        if(errors.length){
          errors = errors.join(' ');
          this.set('errors', errors);
          $("#flashError").show().fadeIn().delay(2000).fadeOut('slow');
        } else {
          $("#flashSuccess").show().fadeIn().delay(2000).fadeOut('slow');
        }
      }
      this.set('modal', false);

    //this.get('workflow').destroyRecord().then(
        //() => { $("#flashSuccess").show().fadeIn().delay(2000).fadeOut('slow'); },
        //() => { $("#flashError").show().fadeIn().delay(2000).fadeOut('slow'); }
    //)
    },
    editCards(){
      var modal = {
        title: 'modal.edit.title',
        message: 'edit',
        submitButton: 'modal.edit.submitButton',
      };

      this.set('modalContent', modal);
      this.set('modal', true);

    }
  }


});
