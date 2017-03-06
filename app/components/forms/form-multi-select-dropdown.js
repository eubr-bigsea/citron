import FormComponent from 'lemonade-ember/lib/form-component';
import Ember from 'ember';

export default FormComponent.extend({
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
