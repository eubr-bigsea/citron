import FormComponent from 'lemonade-ember/lib/form-component';

export default FormComponent.extend({
  didReceiveAttrs() {
    this._super(...arguments);
    let isChecked;
    if(this.get('currentValue') === '1' || this.get('currentValue') === true ){
      this.set('isChecked', true);
    } else {
      this.set('isChecked', false);
    }
  },
  actions:{
    valueChanged(newValue){
      if(newValue === true){
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
