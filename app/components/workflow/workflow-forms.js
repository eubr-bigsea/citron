/* global Ps */

import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    Ps.initialize(document.getElementById(this.elementId));
  },
  actions: {
    formChanged(key, value) {
      this.set(`filledForms.${key}.value`, value);
      if(key === 'color') {
        Ember.$('#' + this.get('task').id).css('background-color', value);
      }
    }
  }
});
