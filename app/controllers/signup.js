import $ from 'jquery';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),
  sessionAccount: service(),

  resetAlerts(){
    var errors = $('.has-error')
    errors.removeClass('has-error')
  },

  create(user, controller){
    user.save().then(function() {
      controller.get('session').authenticate('authenticator:devise', user.get('email'), user.get('password'));
    }).catch(() => {
      var errors = user.get('errors').toArray();
      for(var i=0, len=errors.length; i<len; i++){
        $(`#${errors[i].attribute}`).addClass('has-error');
      }
    }).then(() => {controller.transitionToRoute('home')});
  },

  actions:{
    signup(){
      var controller = this;
      controller.get('resetAlerts')();
      var user = controller.get('model');
      this.get('create')(user, controller);
    },
  },
});
