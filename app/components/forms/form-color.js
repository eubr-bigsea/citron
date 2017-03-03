import FormComponent from 'lemonade-ember/lib/form-component';

export default FormComponent.extend({
  init() {
    this._super(...arguments);

    this.set('parsedValues', JSON.parse(this.get('field.values')));
  }
});
