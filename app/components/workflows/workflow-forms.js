import Ember from 'ember';
import Ps from 'npm:perfect-scrollbar';

export default Ember.Component.extend({
  didInsertElement() {
    Ps.initialize(document.getElementById(this.elementId));
  },
  actions: {
    formChanged(key, value) {
      this.set(`filledForms.${key}.value`, value);
      let el = Ember.$('#' + this.get('task').id);
      if(key === 'color') {
        el.css('background-color', value.background);
        el.css('color', value.foreground);
      }
      if(key === 'comment') {
        el.children('span').text(value);
      }
    }
  }
});
