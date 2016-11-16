import Ember from 'ember';
import config from '../../config/environment';

const { RSVP: { Promise }, $: { ajax }, run } = Ember;

export default Ember.Controller.extend({
  successMessage: null,
  processingRequest: false,
  emailFormGroup: 'form-group',
  invalidEmailErrorMessage: null,

  resetAlerts(){
    this.setProperties({
      successMessage: null,
      mailFormGroup: 'form-group',
      invalidEmailErrorMessage: null,
      processingRequest: false,
    });
  },

  actions:{
    request(){
      this.resetAlerts();
      this.set('processingRequest', true);
      var cred =  this.getProperties('email');
      var requestOptions = {
        url: `${config.thorn}/users/password`,
        type: 'POST',
        data: { email: cred.email, redirect_url:`${config.citron}` }
      };
      return new Promise((resolve, reject) => {
        ajax(requestOptions).then(
          (success) => { run(() => { resolve(success); }); },
          (error) => { run(() => { reject(error.responseJSON); }); }
        );
      })
        .then(() =>{ run.later(() => { this.transitionToRoute('/'); }, 7000); })
        .catch((reason) => {
          this.set('processingRequest', false);
          this.set('emailFormGroup', 'form-group has-error');
          this.set('invalidEmailErrorMessage', reason.errors);
        });
    },
  },
});
