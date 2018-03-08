import { computed } from '@ember/object';
import FormComponent from 'lemonade-ember/lib/form-component';

export default FormComponent.extend({
  classNameBindings: ['error'],
  error: computed('field.error', function(){ return this.get('field.error') }),
});
