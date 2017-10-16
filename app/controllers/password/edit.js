import Controller from '@ember/controller';
import $ from 'jquery';
import { run } from '@ember/runloop';
import config from '../../config/environment';

export default Controller.extend({
  queryParams: ['reset_password_token'],
  reset_password_token: null,
  successMessage: null,
  processingRequest: false,

  actions:{
    request: function(){
      this.set('processingRequest', true);
      let { email,
        password,
        password_confirmation,
        reset_password_token
      } = this.getProperties('email', 'password', 'password_confirmation', 'reset_password_token');
      var self = this;
      $.ajax({
        url: `${config.thorn}/api/users/password`,
        data: {
          user: {
            email: email,
            password: password,
            password_confirmation: password_confirmation,
            reset_password_token: reset_password_token
          }
        },
        type : 'PATCH',
        success(){
          self.set('processingRequest', false);
          self.set('successMessage', true);
          run.later(() => { self.transitionToRoute('login'); }, 3000);
        },
        error(reason){
          if(reason.status === 500){
            return self.transitionToRoute('maintenance');
          }

          let err = reason.responseJSON.errors;

          if(err.reset_password_token){
            self.set('tokenErrorMessage', err.reset_password_token);
          } else if(err.password) {
            $('#passwords').addClass('has-error');
            $('#password-error').addClass('has-error');
            self.set('passwordErrorMessage', err.password);
          } else if (err.password_confirmation) {
            $('#passwords').addClass('has-error');
            $('#password-error').addClass('has-error');
            self.set('passwordErrorMessage', err.password_confirmation);
          }
          self.set('processingRequest', false);
        }
      });
    },
  },
});
