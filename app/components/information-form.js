import $ from 'jquery';
import Component from '@ember/component';
import Ps from '@perfect-scrollbar';

export default Component.extend({
  didInsertElement() {
    new Ps(document.getElementById(this.elementId));
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
