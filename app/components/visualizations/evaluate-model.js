import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  currentUser: Ember.inject.service("current-user"),

  init() {
    this._super(...arguments);
  },

  // Set my style for component
  myStyle: Ember.computed('cHeight', function() {
    return Ember.String.htmlSafe(`height: ${this.get('cHeight')}px;`);
  }),

  myTableStyle: Ember.computed('cHeight', function() {
    return Ember.String.htmlSafe(`max-height: ${this.get('cHeight') - 40}px;`);
  }),

  cHeight: Ember.computed('offsetTop','height', function() {
    if(this.get('height') === 0) {
      return ($(window).outerHeight() - this.get('offsetTop')) * 0.4926;
    }

    else { return this.get('height'); }
  }),

  didReceiveAttrs() {
    let component = this;
    let currentUser = component.get("currentUser");

    Ember.$.ajax({
      url: component.get('dataUrl'),
      type: "GET",
      data: {},
      beforeSend: (request) => {
        gViz.helpers.loading.show();

        request.setRequestHeader('X-Auth-Token', '123456');
        request.setRequestHeader('access-token', currentUser.accessToken);
        request.setRequestHeader('client', currentUser.client);
        request.setRequestHeader('expire', currentUser.expire);
        request.setRequestHeader('uid', currentUser.uid);
        request.setRequestHeader('token-type', currentUser.tokenType);
      },
      success: (data) => {
        let body = data["data"].replace("\n", "");
        component.set("body", body);
        if(body.length === 0) { component.set("isEmpty", true); }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        gViz.helpers.loading.hide();
      },
    });
  },
});
