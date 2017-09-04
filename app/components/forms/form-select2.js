import FormComponent from 'lemonade-ember/lib/form-component';
import Ember from 'ember';

export default FormComponent.extend({
  didInsertElement() {
    this.$('select').select2({
      dropdownParent: this.$(),
      tags: true
    });
  },
  didReceiveAttrs(){
    this.set('parsedValues', Ember.A());

    let parsed = this.get('parsedValues');
    let values = JSON.parse(this.get('field.values'));
    let currentValue = this.get('currentValue');
    let knownValue = false;

    if(values) {
      values.forEach((el) => {
        if(parsed.findBy('val', el) === undefined) {
          if(el.value === currentValue) {
            knownValue = true;
          }
          parsed.addObject({
            key: el.key,
            value: el.value,
            selected: el.value === currentValue
          });
        }
      });
    }

    if(!knownValue && currentValue) {
      parsed.addObject({
        key: currentValue.key,
        value: currentValue.value,
        selected: true
      });
    }
  },

  actions: {
    valueChanged() {
      let value = this.$('select').val();
      this._super({key: value, value: value, selected: true});
    }
  }
});
