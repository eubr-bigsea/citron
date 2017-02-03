import config from '../config/environment';
import DeviseAuthenticator from 'ember-simple-auth/authenticators/devise';
import Ember from 'ember';

const { RSVP, isEmpty, run, inject: { service } } = Ember;

export default DeviseAuthenticator.extend({
  serverTokenEndpoint: `${config.thorn}/users/sign_in`,
  currentUser: service('current-user'),

  restore(data){
    return new RSVP.Promise((resolve, reject) => {
      if (!isEmpty(data.accessToken) && !isEmpty(data.expiry) &&
        !isEmpty(data.tokenType) && !isEmpty(data.uid) && !isEmpty(data.client)) {
          resolve(data);
        } else {
          reject();
        }
    });
  },

  authenticate(identification, password) {
    return new RSVP.Promise((resolve, reject) => {
      const { identificationAttributeName } = this.getProperties('identificationAttributeName');
      const data         = { password };
      data[identificationAttributeName] = identification;

      this.makeRequest(data).then(
        (response, status, xhr) => {
          var user = response.data;
          user.accessToken = xhr.getResponseHeader('access-token');
          user.expiry = xhr.getResponseHeader('expiry');
          user.tokenType = xhr.getResponseHeader('token-type');
          user.uid = xhr.getResponseHeader('uid');
          user.client = xhr.getResponseHeader('client');
          var result = {
            currentUser: user,
            id: response.data.id,
            accessToken: xhr.getResponseHeader('access-token'),
            expiry: xhr.getResponseHeader('expiry'),
            tokenType: xhr.getResponseHeader('token-type'),
            uid: xhr.getResponseHeader('uid'),
            client: xhr.getResponseHeader('client')
          };
          run(null, resolve, result);
        },
        (xhr) => {
          run(null, reject, xhr.responseJSON || xhr.responseText);
        });
    });
  },
});
