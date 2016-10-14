import Ember from 'ember';
import jsonwebtoken from "npm:jsonwebtoken";

const { service } = Ember.inject;
const { store } = Ember.inject;

export default Ember.Component.extend({

  session: service('session'),
  store: service("store"),

  actions: {

    authenticate: function() {
      let credentials = this.getProperties('email', 'password');

      this.get('session')
        .authenticate('authenticator:jwt', credentials)
        .then( function(value){console.log(value);})
        .catch((reason)=>{
          this.set('errorMessage', reason.error || reason);
        });
    },
  }
});

