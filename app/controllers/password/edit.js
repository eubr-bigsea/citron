import Ember from 'ember';
import config from '../../config/environment';

const { $: { ajax }, run } = Ember;

export default Ember.Controller.extend({
  queryParams: ['reset_password_token'],
  reset_password_token: null,
  successMessage: null,
  processingRequest: false,
  emailFormGroup: 'form-group',
  invalidEmailErrorMessage: null,
  passwordFormGroup: 'form-group',
  invalidPasswordErrorMessage: null,

  resetAlerts: function(){
    this.setProperties({
      successMessage: null,
      mailFormGroup: 'form-group',
      invalidEmailErrorMessage: null,
      passwordFormGroup: 'form-group',
      invalidPasswordErrorMessage: null,
      processingRequest: false,
    });
  },

  alertErrors(errors){
    if (errors.email){
      this.set('emailFormGroup', 'form-group has-error');
      this.set('invalidEmailErrorMessage', `This email ${errors.email}`);
    } else if (errors.password){
      this.set('passwordFormGroup', 'form-group has-error');
      this.set('invalidPasswordErrorMessage', `Password ${errors.password}`);
    } else if (errors.password_confirmation){
      this.set('passwordFormGroup', 'form-group has-error');
      this.set('invalidPasswordErrorMessage', `Password ${errors.password_confirmation}`);
    } else if (errors[0]){
      this.set('passwordFormGroup', 'form-group has-error');
      this.set('invalidPasswordErrorMessage', errors[0]);
    }
  },

  actions:{
    request: function(){
      this.resetAlerts();
      this.set('processingRequest', true);
      let { email, password, password_confirmation, reset_password_token } = this.getProperties('email', 'password', 'password_confirmation', 'reset_password_token');
      var requestOptions = {
        url: `${config.thorn}/users/password`,
        data: {
          email: email,
          password: password,
          password_confirmation: password_confirmation,
          reset_password_token: reset_password_token
        },
        type : 'PUT',
      };
      ajax(requestOptions)
        .then(
          () =>{ run(() => { this.transitionToRoute('login'); });},
          (reason) => { this.alertErrors(reason.responseJSON.errors); }
        );
    },
  },
});
