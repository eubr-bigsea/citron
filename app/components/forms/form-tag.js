import { set } from '@ember/object';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import FormComponent from 'lemonade-ember/lib/form-component';

export default FormComponent.extend({
  classNameBindings: ['error'],
  error: computed('field.error', function(){ return this.get('field.error') }),

  didInsertElement() {
    this.$('select').select2({
      tags: true,
      dropdownParent: this.$(),
      data: this.get('parsedValues')
    });
  },

  didReceiveAttrs(){
    this.set('parsedValues', A());

    let parsed = this.get('parsedValues');
    let values = this.get('field.suggestedAttrs');
    let currentValue = this.get('currentValue');

    if(values) {
      values.forEach((el) => {
        if(parsed.findBy('id', el) === undefined) {
          parsed.addObject({
            id: el,
            text: el,
            selected: false
          });
        }
      });
    }

    if(currentValue) {
      currentValue.forEach((el) => {
        if(parsed.findBy('id', el) === undefined) {
          parsed.addObject({
            id: el,
            text: el,
            selected: true
          });
        } else {
          var current = parsed.findBy('id', el);
          set(current, 'selected', true);
        }
      });
    }

  },
  actions: {
    valueChanged() {
      this._super(this.$('select').val());
    }
  }
});
