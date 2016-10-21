import Ember from 'ember';
import config from '../../config/environment';

const { RSVP: { Promise }, $: { ajax }, run } = Ember;

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
  validatePassword: function(password, retypePassword){
    if(password.length < 6){
      this.set('passwordFormGroup', 'form-group has-error');
      this.set('invalidPasswordErrorMessage', 'Password to short');
      return false;
    } else if( password !== retypePassword){
      this.set('passwordFormGroup', 'form-group has-error');
      this.set('invalidPasswordErrorMessage', 'Retyped password not match');
      return false;
    }
    return true;
  },


  actions:{
    request: function(){
      this.resetAlerts();
      this.set('processingRequest', true);
      var userData =  this.getProperties('email', 'password', 'retypePassword', 'reset_password_token');
      if(this.validatePassword(userData.password, userData.retypePassword)){

      var requestOptions = {
        url: `${config.host}/users/password`,
        data: userData,
        type : 'POST',

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
          run(() => { this.transitionToRoute('login'); });
        })
        .catch((reason) => {
          this.set('processingRequest', false);
          this.set('emailFormGroup', 'form-group has-error');
          this.set('invalidEmailErrorMessage', reason.errorMessage);
        });
      }
    },
  },
});
