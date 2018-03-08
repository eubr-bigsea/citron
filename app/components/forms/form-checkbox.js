import FormComponent from 'lemonade-ember/lib/form-component';
import { computed } from '@ember/object';

export default FormComponent.extend({
  classNameBindings: ['checked', 'error'],
  checked: computed('currentValue', function(){ return this.get('currentValue') == '1' ? 'unchecked' : 'checked' }),
  error: computed('field.error', function(){ return this.get('field.error') }),

  actions:{
    valueChanged(){
      let currentValue = this.get('currentValue')
      if(currentValue === '0'){
        this.set('currentValue', '1');
      } else {
        this.set('currentValue', '0');
      }
      let onValueChanged = this.get('onValueChanged');

      if(onValueChanged !== undefined) {
        onValueChanged(this.get('name'), this.get('currentValue'));
      }
    }
  }
});
