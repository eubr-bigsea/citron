import Ember from 'ember';

export default Ember.Component.extend({
  currentColor: "#ddd",
  init() {
    this._super(...arguments);
    this.set('parsedValues', JSON.parse(this.get('field.values')));
  },
  actions: {
    updateColor(color) {
      this.set('currentColor', color);
    }
  }
});
