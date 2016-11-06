import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    this.set('parsedValues', JSON.parse(this.get('field.values')));
  },
  actions: {
    updateColor(color) {
      this.set('value', color);
    }
  }
});
