import Ember from 'ember';
import config from '../config/environment';

const { RSVP: { Promise }, $: { ajax }, run } = Ember;
const { inject: { service }, isEmpty } = Ember;

export default Ember.Service.extend({
  session: service('session'),
  tokenEndpoint: `${config.thorn}/user`,

  setCurrentUser(currentUser){
    const serv = this;
    Object.keys(currentUser).forEach(function (key) {
      if(!isEmpty(key)){ serv.set(key, currentUser[key]);}
    });
  },

  loadCurrentUser(){
    var authenticated = this.get('session.data.authenticated');
    var requestOptions = {
      beforeSend(request){
        request.setRequestHeader('access-token', authenticated.accessToken);
        request.setRequestHeader('client', authenticated.client);
        request.setRequestHeader('expiry', authenticated.expiry);
        request.setRequestHeader('uid', authenticated.uid);
      },
      url: this.tokenEndpoint,
      type: 'GET',
    };
    if(this.get('session.isAuthenticated')){
      new Promise((resolve, reject) => {
        ajax(requestOptions).then(
          (response) => { run(() => { this.setCurrentUser(response); }); },
          (error) => {run(() => { reject(error.responseJSON); }); }
        );
      });
    }
  },
});
