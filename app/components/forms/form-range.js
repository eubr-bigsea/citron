import { computed } from '@ember/object';
import FormComponent from 'lemonade-ember/lib/form-component';

export default FormComponent.extend({
  classNameBindings: ['error'],
  error: computed('field.error', function(){ return this.get('field.error') }),
  deltaValue: computed('value', function() {
    return 100 - this.get('value');
  }),
  value: computed('currentValue', function(){
    let currentValue = this.get('currentValue');
    return currentValue == null ? '50' : currentValue;
  }),
  willDestroyElement(){
    if(this.get('currentValue') == null){
      this.set('currentValue', '50');
    }
  }

});
