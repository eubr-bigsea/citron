import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    this.set('parsedValues', JSON.parse(this.get('field.values')));
  },
  actions: {
    valueUpdated(newValue) {
      this.set('value', newValue);
      this.get('onChange')(this.get('field.name'), this.get('value'));
    }
  }
});
