import { computed } from '@ember/object';
import FormComponent from 'lemonade-ember/lib/form-component';

export default FormComponent.extend({
  deltaValue: computed('currentValue', function() {
    return 100 - this.get('currentValue');
  })
});
