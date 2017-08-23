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
          let token = session.get('data.authenticated.token');
          let email = session.get('data.authenticated.email');

          $.ajaxSetup({
            headers: {
              'Authorization': `Token token=${token}, email=${email}`,
              'X-Auth-Token': '123456',
              'Locale': this.get('session.data.locale')
            }
          });

          self.transitionToRoute('home')
        });
    },
  },
});
