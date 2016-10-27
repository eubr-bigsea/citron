import Ember from 'ember';
import config from '../config/environment';

const { RSVP: { Promise }, $: { ajax }, run } = Ember;
const { service } = Ember.inject;

export default Ember.Controller.extend({
  session: service('session'),

  emailFormGroup: 'form-group',
  invalidEmailErrorMessage: null,
  passwordFormGroup: 'form-group',
  invalidPasswordErrorMessage: null,

  createAccount: function(userData){
    var requestOptions = {
      url: `${config.host}/users`,
      type: 'POST',
      data: {user: userData},
    };
    return new Promise((resolve, reject) => {
      ajax(requestOptions).then(
        () => {
          run(() => { resolve( {email: userData.email, password: userData.password} ); });
        },
        (error) => {
          run(() => { reject(error.responseJSON); }); }
      );
    });
  },

  resetAlerts: function(){
    this.setProperties({
      mailFormGroup: 'form-group',
      invalidEmailErrorMessage: null,
      passwordFormGroup: 'form-group',
      invalidPasswordErrorMessage: null,
    });
  },

  validatePassword: function(password, retypePassword){
    if(password.length < 6){
      this.set('passwordFormGroup', 'form-group has-error');
      this.set('invalidPasswordErrorMessage', 'Password too short');
      return false;
    } else if( password !== retypePassword){
      this.set('passwordFormGroup', 'form-group has-error');
      this.set('invalidPasswordErrorMessage', 'Retyped password not match');
      return false;
    }
    return true;
  },

  actions:{
    signup(){

      this.resetAlerts();

      let userData = this.getProperties('email', 'password','firstname', 'lastname');
      let retypePassword = this.getProperties('retypePassword').retypePassword;

      if(this.validatePassword(userData.password, retypePassword)){
        this.createAccount(userData)
          .catch((reason) => {
            if ( reason.code === 3 ){
              this.set('emailFormGroup', 'form-group has-error');
              this.set('invalidEmailErrorMessage', reason.errorMessage);
            }
          })
          .then((creds) => {
            this.get('session').authenticate('authenticator:jwt', creds);
          });
      }
    },
  },
});
