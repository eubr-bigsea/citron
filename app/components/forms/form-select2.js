import { set } from '@ember/object';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import FormComponent from 'lemonade-ember/lib/form-component';

export default FormComponent.extend({
  classNameBindings: ['error'],
  error: computed('field.error', function(){ return this.get('field.error') }),

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
        if(!parsed.findBy('id', el.key)) {
          parsed.addObject({
            id: el.key,
            text: el.value,
          });
        }
      });
    }

    if(currentValue){
      if(!parsed.findBy('id', currentValue.key)){
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
