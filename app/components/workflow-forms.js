import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    formChanged(key, value) {
      this.set(`filledForms.${key}`, value);
      this.get('workflow').save();
      if(key === 'color') {
        Ember.$('#' + this.get('task').id).css('background-color', value);
      }
    }
  }
});
