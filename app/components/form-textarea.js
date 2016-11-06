import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    valueUpdated() {
      this.get('onChange')(this.get('field.name'), this.get('value'));
    }
  }
});
