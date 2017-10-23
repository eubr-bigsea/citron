import { set } from '@ember/object';
import { A } from '@ember/array';
import FormComponent from 'lemonade-ember/lib/form-component';

export default FormComponent.extend({
  didInsertElement() {
    this.$('select').select2({
      dropdownParent: this.$(),
      tags: true,
      data: this.get('parsedValues')
    });
  },

  didReceiveAttrs(){
    this.set('parsedValues', A());

    let parsed = this.get('parsedValues');
    let values = JSON.parse(this.get('field.values'));
    let currentValue = this.get('currentValue');

    if(values) {
      values.forEach((el) => {
        if(parsed.findBy('id', el.key) === null) {
          parsed.addObject({
            id: el.key,
            text: el.value,
            selected: el.key === currentValue.key
          });
        }
      });
    }

    if(currentValue){
      if(parsed.findBy('id', currentValue.key) === undefined){
        parsed.addObject({
          id: currentValue.key,
          text: currentValue.value,
          selected: true
        })
      } else {
        var current = parsed.findBy('id', currentValue.key);
        set(current, 'selected', true);
      }
    }
  },

  actions: {
    valueChanged() {
      let value = this.$('select').val();
      this._super({key: value, value: value, selected: true});
    }
  }
});
