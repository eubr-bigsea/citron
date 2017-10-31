import FormComponent from 'lemonade-ember/lib/form-component';

export default FormComponent.extend({
  didReceiveAttrs() {
    this._super(...arguments);
    var values = JSON.parse(this.get('field.values')).map( (el) => { return {key: String(el.key), value: el.value } })
    this.set('parsedValues', values);
  }
});
