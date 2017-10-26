/* global window, gViz */

import $ from 'jquery';
import { htmlSafe } from '@ember/string';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  session: service(),

  init() {
    this._super(...arguments);
  },

  // Set my style for component
  myStyle: computed('cHeight', function() {
    return htmlSafe(`height: ${this.get('cHeight')}px;`);
  }),

  myTableStyle: computed('cHeight', function() {
    return htmlSafe(`max-height: ${this.get('cHeight') - 40}px;`);
  }),

  cHeight: computed('offsetTop','height', function() {
    if(this.get('height') === 0) {
      return ($(window).outerHeight() - this.get('offsetTop')) * 0.4926;
    }

    else { return this.get('height'); }
  }),

  didReceiveAttrs() {
    let component = this;

    $.ajax({
      url: component.get('dataUrl'),
      type: "GET",
      data: {},
      beforeSend: (request) => {
        gViz.helpers.loading.show();

        request.setRequestHeader('X-Auth-Token', '123456');
        request.setRequestHeader('Authorization', `Token token=${component.get('session.data.authenticated.token')} email=${component.get('session.data.authenticated.email')}`);
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
