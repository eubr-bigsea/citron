import Ember from 'ember';

export default Ember.Component.extend({
  value: Ember.computed('field', function() {
    return this.get('field.values');
  }),
  deltaValue: Ember.computed('value', function() {
    return 100 - this.get('value');
  }),
  actions: {
    updateValue() {
      this.set('value', Ember.$(this.element).children('input').val());
    }
  }
});
