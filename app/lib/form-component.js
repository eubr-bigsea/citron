import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    valueChanged(newValue) {
      this.set('currentValue', newValue);

      let onValueChanged = this.get('onValueChanged');

      if(onValueChanged !== undefined) {
        onValueChanged(this.get('name'), this.get('currentValue'));
      }
    }
  }
});
