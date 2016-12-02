import Ember from 'ember';
import config from '../config/environment';

const { inject: { service }, isEmpty , run} = Ember;

export default Ember.Service.extend({
  session: service('session'),
  tokenEndpoint: `${config.thorn}/user`,

  setCurrentUser(currentUser){
    Object.keys(currentUser).forEach((key) => {
      if(!isEmpty(key)){ this.set(key, currentUser[key]);}
    });
    this.set('login', currentUser.email);
    this.set('name', `${currentUser.firstname} ${currentUser.lastname}`);
  },

  loadCurrentUser(){
    if(this.get('session.isAuthenticated')){
      var user = this.get('session.data.authenticated.currentUser');
      run(() => { this.setCurrentUser(user); });
    }

  },
});
