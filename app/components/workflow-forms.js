import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    formChanged(key, value) {
      console.log(`${key} changed to ${value}`);
    }
  }
});
