import Ember from 'ember';

export default Ember.Component.extend({
  parsedValues: null,
  init() {
    this._super(...arguments);

    this.set('parsedValues', JSON.parse(this.get('field.values')));
  },
  didInsertElement() {
    Ember.$(`#${this.elementId} select`).select2({
      tags: true
    });
  }
});
