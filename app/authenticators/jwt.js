import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import config from '../config/environment';
import jsonwebtoken from 'npm:jsonwebtoken';

const { RSVP: { Promise }, $: { ajax }, run } = Ember;
const jwt  = jsonwebtoken;

const { store } = Ember.inject();

export default Base.extend({

  tokenEndpoint: `${config.host}/auth_user`,

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
      type: 'POST',
      data: creds,
    };

    return new Promise((resolve, reject) => {
      ajax(requestOptions)
        .then(
          (response) => {
            const auth_token = response.auth_token;
            var decode = jwt.decode(auth_token);
            window.dec = decode;

            const user = decode.user;
            console.log(user);
            console.log(store);
            store.pushPayload({current_user: user})

            // Wrapping aync operation in Ember.run
            run(() => { resolve({ token: auth_token }); });
          },
          (error) => {
            // Wrapping aync operation in Ember.run
            run(() => { reject(JSON.parse(error.responseText)['errors'][0]); }); }
          );
      }); },

  invalidate(data) { return Promise.resolve(data); },
});
