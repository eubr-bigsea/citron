import Ember from 'ember';
import Ps from 'npm:perfect-scrollbar';

export default Ember.Component.extend({
  elementId: 'forms',
  classNames: ['sidebar', 'sidebar-container'],
  didInsertElement() {
    Ps.initialize(document.getElementById(this.elementId));
  },
  actions: {
    formChanged(key, value) {
      let el = Ember.$('#' + this.get('task').id);
      if(key === 'color') {
        el.css('background-color', value.background);
        el.css('color', value.foreground);
      }
      if(key === 'comment') {
        el.find('.comment-text span').text(value);
      }
      this.set(`filledForms.${key}.value`, value);
    }
  }
});
