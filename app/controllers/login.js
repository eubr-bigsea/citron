import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Controller.extend({
  session: service('session'),

  actions: {
    authenticate(){
      var self = this;
      let session = this.get('session');
      let { identification, password } = this.getProperties('identification', 'password');
      session.authenticate('authenticator:devise', identification, password).catch(
        function(){
          self.set('errorMessage', 'Error with your email or password');
          Ember.$('#email').addClass('has-error');
          Ember.$('#password').addClass('has-error');
          Ember.$('#error-message').addClass('has-error');
        }).then(() => {
          let locale = this.get('session.data.authenticated.locale')
          this.set('session.data.locale', locale);
          self.transitionToRoute('home')
        });
    },
  },
});
