import Ember from 'ember';
import config from '../../config/environment';

const { $, run } = Ember;

export default Ember.Controller.extend({
  successMessage: null,
  errorMessage: null,
  processingRequest: false,
  email: null,


  actions:{
    request(){
      Ember.$('#email').removeClass('has-error');
      Ember.$('#error-message').removeClass('has-error');
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
          Ember.$('#email').addClass('has-error');
          Ember.$('#error-message').addClass('has-error');
          self.set('errorMessage', reason.responseJSON.errors.email);
          return
        }
      })
    },
  },
});
