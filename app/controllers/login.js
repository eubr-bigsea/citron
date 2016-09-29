import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    authenticate: function() {
      let credentials = this.getProperties('email', 'password');
      this.get('session').authenticate('authenticator:jwt', credentials).catch((reason)=>{
        this.set('errorMessage', reason.error || reason);
      });
    }
  }
});
