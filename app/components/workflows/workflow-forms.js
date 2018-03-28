import $ from 'jquery';
import Component from '@ember/component';
import Ps from '@perfect-scrollbar';

export default Component.extend({
  elementId: 'forms',
  didInsertElement() {
    new Ps("#forms");
  },
  actions: {
    formChanged(key, value) {
      let el = $('#' + this.get('task').id);
      if(key === 'color') {
        el.css('background-color', value.background);
        el.css('border-color', value.background);
        // el.css('color', value.background);
        $('#' + this.get('task').id + ' input').css('color', value.foreground);
      }
      this.set(`task.forms.${key}.value`, value);
      this.set('hasChanged', true);
      this.set('formsChanged', true);
    },
    removeTask(){
      this.get('removeTask')(this.get('task'));
    }
  }
});
