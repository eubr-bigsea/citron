import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({

  session: service('session'),
  store: service("store"),

  actions: {

    authenticate: function() {
      let credentials = this.getProperties('email', 'password');
      this.get('session').authenticate('authenticator:jwt', credentials)
        .catch((reason)=>{ this.set('errorMessage', reason.error || reason); });
    },
  }
});

