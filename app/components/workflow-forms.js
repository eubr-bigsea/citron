import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    formChanged(key, value) {
      this.get('filledForms').set(key, value);
      this.get('workflow').save();
      console.log(`${key} changed to ${value}`);
      console.log(this.get('filledForms'));
    }
  }
});
