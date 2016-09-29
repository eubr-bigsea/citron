import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import config from '../config/environment';

const { RSVP: { Promise }, $: { ajax }, run } = Ember;

export default Base.extend({

  tokenEndpoint: `${config.host}/auth_user`,

  restore(data) {
    return new Promise((resolve, reject) => {
      if (!Ember.isEmpty(data.token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },


  authenticate(creds) {
    const requestOptions = {
      url: this.tokenEndpoint,
      type: 'POST',
      data: creds,

    };

    return new Promise((resolve, reject) => {
      ajax(requestOptions).then((response) => {
        const { auth_token } = response;
        // Wrapping aync operation in Ember.run
        run(() => {
          resolve({
            token: auth_token
          });
        });
      }, (error) => {
        // Wrapping aync operation in Ember.run
        run(() => {
          reject(error);
        });
      });
    });
  },
  invalidate(data) {
    return Promise.resolve(data);
  }
});
