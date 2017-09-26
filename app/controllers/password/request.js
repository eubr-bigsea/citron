import Ember from 'ember';
import config from '../../config/environment';

const { RSVP: { Promise }, $: { ajax }, run } = Ember;

export default Ember.Controller.extend({
  successMessage: null,
  errorMessage: null,
  processingRequest: false,
  email: null,

  actions:{
    request(){
      this.set('processingRequest', true);
      let email =  this.get('email');
      let self = this;
      $.ajax({
        url: `${config.thorn}/api/users/password`,
        type: 'POST',
        data: { user: {email: email}, redirect_url:`${config.citron}` },
        success(response){
          self.set('processingRequest', false);
          self.set('successMessage', true);
          run.later(() => { self.transitionToRoute('/'); }, 4000);
        },
        error(reason){
          self.set('processingRequest', false);
          self.set('successMessage', false);
          Ember.$('#email').addClass('has-error');
          Ember.$('#error-message').addClass('has-error');
          self.set('errorMessage', reason.responseJSON.errors.email);
        }
      })
    },
  },
});
