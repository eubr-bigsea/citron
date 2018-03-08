import $ from 'jquery';
import FormComponent from 'lemonade-ember/lib/form-component';
import { computed } from '@ember/object';

export default FormComponent.extend({
  classNameBindings: ['error'],
  error: computed('field.error', function(){ return this.get('field.error') }),

  parsedValues: null,
  init() {
    this._super(...arguments);

    this.set('parsedValues', JSON.parse(this.get('field.values')));
  },
  didInsertElement() {
    $(`#${this.elementId} select`).select2({
      tags: true,
      dropdownParent: this.$()
    });
  }
});
