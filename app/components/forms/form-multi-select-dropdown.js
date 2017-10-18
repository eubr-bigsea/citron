import $ from 'jquery';
import FormComponent from 'lemonade-ember/lib/form-component';

export default FormComponent.extend({
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
