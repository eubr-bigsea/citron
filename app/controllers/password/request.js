import Controller from '@ember/controller';
import $ from 'jquery';
import { run } from '@ember/runloop';
import config from '../../config/environment';

export default Controller.extend({
  successMessage: null,
  errorMessage: null,
  processingRequest: false,
  email: null,


  actions:{
    request(){
      $('#email').removeClass('has-error');
      $('#error-message').removeClass('has-error');
      this.set('errorMessage', null);
      this.set('processingRequest', true);
      let email =  this.get('email');
      let self = this;
      $.ajax({
        url: `${config.thorn}/api/users/password`,
        type: 'POST',
        data: { user: {email: email} },
        success(){
          self.set('processingRequest', false);
          self.set('successMessage', true);
          run.later(() => { self.transitionToRoute('/'); }, 4000);
        },
        error(reason){
          if(reason.status === 500){
            return self.transitionToRoute('maintenance');
          }
          self.set('processingRequest', false);
          self.set('successMessage', false);
          $('#email').addClass('has-error');
          $('#error-message').addClass('has-error');
          self.set('errorMessage', reason.responseJSON.errors.email);
          return
        }
      })
    },
  },
});
