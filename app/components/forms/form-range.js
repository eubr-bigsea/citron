import FormComponent from 'lemonade-ember/lib/form-component';

export default FormComponent.extend({
  init() {
    this._super(...arguments);
    this.set('value', this.get('field.values'));
    this.set('deltaValue', 100 - this.get('field.values'));
  },
  actions: {
    valueChanged(newValue) {
      this.set('deltaValue', 100 - newValue);

      this._super(...arguments);
    }
  }
});
