import FormComponent from 'lemonade-ember/lib/form-component';
import { computed } from '@ember/object';

export default FormComponent.extend({
  classNameBindings: ['error'],
  error: computed('field.error', function(){ return this.get('field.error') }),

  didReceiveAttrs() {
    this._super(...arguments);
    var values = JSON.parse(this.get('field.values')).map( (el) => { return {key: String(el.key), value: el.value } })
    this.set('parsedValues', values);
  }
});
