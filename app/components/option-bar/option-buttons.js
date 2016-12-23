import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['option-bar'],
  actions: {
    saveWorkflow() {
      this.get('workflow').save();
    }
  }
});
