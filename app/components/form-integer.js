import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    valueUpdated(newValue) {
      this.set('value', newValue);
      this.get('onChange')(this.get('field.name'), this.get('value'));
    }
  }
});
