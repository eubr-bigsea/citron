import { computed } from '@ember/object';
import FormComponent from 'citron/lib/form-component';

export default FormComponent.extend({
  classNameBindings: ['error'],
  error: computed('field.error', function(){ return this.get('field.error') }),
  init(){
    this._super(...arguments);
    console.log(this.get('value'));
    //this.set('value', 50);
    //if(this.get('value') == ""){
    //  this.set('value', '50');
    //  this.set('currentValue', '50');
    //}
  },
  deltaValue: computed('value', function() {
    return 100 - this.get('value');
  }),
  value: computed('currentValue', function(){
    let currentValue = this.get('currentValue');
    return currentValue == "" ? '50' : currentValue;
  }),
  willDestroyElement(){
    if(this.get('currentValue') == ""){
      this.set('currentValue', '50');
    }
  }

});
