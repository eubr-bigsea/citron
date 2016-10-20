import Ember from 'ember';
import config from '../../config/environment';

const { RSVP: { Promise }, $: { ajax }, run } = Ember;

export default Ember.Controller.extend({
  successMessage: null,
  processingRequest: false,
  emailFormGroup: 'form-group',
  invalidEmailErrorMessage: null,
  resetAlerts: function(){
    this.setProperties({
      successMessage: null,
      mailFormGroup: 'form-group',
      invalidEmailErrorMessage: null,
      processingRequest: false,
    });
  },

  actions:{
    request: function(){
      this.resetAlerts();
      this.set('processingRequest', true);
      var email =  this.getProperties('email');
      var requestOptions = {
        url: `${config.host}/users/password`,
        type: 'POST',
        data: email,
      };
      return new Promise((resolve, reject) => {
        ajax(requestOptions).then(
          (success) => {
            run(() => { resolve(success); });
          },
          (error) => {
            run(() => { reject(error.responseJSON); }); }
        );
      })
        .then((response) =>{
          this.set('successMessage', response.successMessage);
          //sleep 7 seg then redirect
          run.later(() => { this.transitionToRoute('/') }, 7000);
        })
        .catch((reason) => {
          this.set('processingRequest', false);
          this.set('emailFormGroup', 'form-group has-error');
          this.set('invalidEmailErrorMessage', reason.errorMessage);
        });

    },
  },
});
