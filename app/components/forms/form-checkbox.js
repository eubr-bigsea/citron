import FormComponent from 'citron/lib/form-component';
import { computed } from '@ember/object';

export default FormComponent.extend({
  classNameBindings: ['checked', 'error'],
  checked: computed('currentValue', function(){
    return this.get('currentValue') == '1' ? 'checked' : 'unchecked'
  }),
  error: computed('field.error', function(){ return this.get('field.error') }),

  actions:{
    valueChanged(){
      let currentValue = this.get('currentValue')
      if(currentValue === '1'){
        this.set('currentValue', '0');
      } else {
        this.set('currentValue', '1');
      }
      let onValueChanged = this.get('onValueChanged');

      if(onValueChanged !== undefined) {
        onValueChanged(this.get('name'), this.get('currentValue'));
      }
    }
  }
});
