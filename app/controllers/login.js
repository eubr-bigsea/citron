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
          let data = this.get('session.data.authenticated');
          let locale = data.locale;
          this.get('session').set('data.locale', locale);
          $.ajaxSetup({
            headers: {
              'Locale': locale,
              'Authorization': `Token token=${data.token}, email=${data.email}`,
              'X-User-Id': `${data.userId}`,
              'X-Auth-Token': '123456',
            }
          });
          self.transitionToRoute('home')
        });
    },
  },
});
