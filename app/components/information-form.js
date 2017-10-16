import $ from 'jquery';
import Component from '@ember/component';
import Ps from 'npm:perfect-scrollbar';

export default Component.extend({
  didInsertElement() {
    Ps.initialize(document.getElementById(this.elementId));
  },
  actions: {
    formChanged(key, value) {
      this.set(`filledForms.${key}.value`, value);
      if(key === 'color') {
        $('#' + this.get('task').id).css('background-color', value);
      }
    }
  }
});
