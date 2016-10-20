import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import config from '../config/environment';
import ENV from '../config/environment';
import jsonwebtoken from 'npm:jsonwebtoken';

const { RSVP: { Promise }, $: { ajax }, run } = Ember;
const jwt  = jsonwebtoken;


export default Base.extend({

  tokenEndpoint: `${config.host}/users/sign_in`,

  restore(data) {
    return new Promise(
      (resolve, reject) => {
        if (!Ember.isEmpty(data.token)) { resolve(data); }
        else { reject(); }
      });
  },


  authenticate(creds) {

    const requestOptions = {
      url: this.tokenEndpoint,
      type: 'GET',
      data: creds,
    };

    return new Promise((resolve, reject) => {
      ajax(requestOptions).then(
        (response) => {
          var authToken = response.auth_token;
          var decodedToken = jwt.verify(authToken, ENV.CITRON_PRIVATE_KEY);
          if (decodedToken){
            run(() => { resolve({token: authToken, currentUser: decodedToken.user}); });
          }else{ run(() => { reject({error:'Session expired'}); }); }
        },
        (error) => {
          run(() => { reject(error.responseJSON); }); }
      );
    }); },

  invalidate(data) { return Promise.resolve(data); },
});