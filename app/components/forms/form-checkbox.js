import FormComponent from 'lemonade-ember/lib/form-component';

export default FormComponent.extend({
  init() {
    this._super(...arguments);
    this.set('currentValue', this.get('currentValue') === true);
  }
});
