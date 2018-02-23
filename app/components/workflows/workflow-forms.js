import $ from 'jquery';
import Component from '@ember/component';
import Ps from '@perfect-scrollbar';

export default Component.extend({
  elementId: 'forms',
  classNames: ['sidebar', 'sidebar-container'],
  didInsertElement() {
    new Ps(document.getElementById(this.elementId));
  },
  actions: {
    formChanged(key, value) {
      let el = $('#' + this.get('task').id);
      if(key === 'color') {
        el.css('background-color', value.background);
        el.css('color', value.foreground);
        $('#' + this.get('task').id + ' input').css('color', value.foreground);
      }
      if(key === 'comment') {
        el.find('.comment-text span').text(value);
      }
      this.set(`task.forms.${key}.value`, value);
      this.set('hasChanged', true);
      this.set('formsChanged', true);
    }
  }
});
