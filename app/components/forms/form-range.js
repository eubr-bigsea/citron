import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
    this.set('value', this.get('field.values'));
    this.set('deltaValue', 100 - this.get('field.values'));
  },
  actions: {
    updateValue(newValue) {
      this.set('value', newValue);
      this.set('deltaValue', 100 - newValue);
      this.get('onChange')(this.get('field.name'), newValue);
    }
  }
});
