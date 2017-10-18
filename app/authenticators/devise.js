import $ from 'jquery';
import config from '../config/environment';
import DeviseAuthenticator from 'ember-simple-auth/authenticators/devise';


export default DeviseAuthenticator.extend({
  serverTokenEndpoint: `${config.thorn}/api/users/sign_in`,
  invalidate() {
    return $.ajax({
      url: `${config.thorn}/api/users/sign_out`,
      type: 'DELETE'
    }).catch(() => {});
  }
});
