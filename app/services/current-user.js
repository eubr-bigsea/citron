import Ember from 'ember';

const { inject: { service }, isEmpty } = Ember;

export default Ember.Service.extend({
  session: service('session'),

  loadCurrentUser(){
    var currentUser = this.get('session.data.authenticated.currentUser');
    if(currentUser){
      const serv = this;
      Object.keys(currentUser).forEach(function (key) {
        if(!isEmpty(key)){ serv.set(key, currentUser[key]);}
      });
    };
  },

});
