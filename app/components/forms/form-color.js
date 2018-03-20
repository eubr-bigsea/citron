import FormComponent from 'lemonade-ember/lib/form-component';
import { computed } from '@ember/object';

export default FormComponent.extend({
  taskColor: '#FFFFFF',

  didReceiveAttrs(){
    let currentValue = this.get('currentValue');
    if(currentValue) {
      this.set('taskColor', this.get('currentValue.background'));
    }
  },

  actions: {
    colorChanged(newValue){
      newValue = { 'foreground': newValue, 'background': newValue}
      this.send('valueChanged', newValue);
    }
  }
});
