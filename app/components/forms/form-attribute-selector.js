import FormComponent from 'lemonade-ember/lib/form-component';
import Ember from 'ember';

export default FormComponent.extend({
  didInsertElement() {
    this.$('select').select2({
      tags: true,
      dropdownParent: this.$()
    });
  },
  didReceiveAttrs(){
    this.set('parsedValues', Ember.A());

    let parsed = this.get('parsedValues');
    let values = JSON.parse(this.get('field.values'));
    let currentValue = this.get('currentValue');

    if(currentValue) {
      currentValue.forEach((el) => {
        parsed.addObject({
          val: el,
          selected: true
        });
      });
    }

    if(values) {
      values.forEach((el) => {
        if(parsed.findBy('val', el) === undefined) {
          parsed.addObject({
            val: el,
            selected: false
          });
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
