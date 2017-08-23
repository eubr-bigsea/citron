import FormComponent from 'lemonade-ember/lib/form-component';
import Ember from 'ember';

export default FormComponent.extend({
  didInsertElement() {
    this.$('select').select2({
      tags: true,
      dropdownParent: this.$()
    });
    this.set('parsedValues', Ember.A());

    let parsed = this.get('parsedValues');
    let values = this.get('field.suggestedAttrs');
    let currentValue = this.get('currentValue');
    let selected = this.$('select').val()

    if(currentValue) {
      currentValue.forEach((el) => {
        if(selected.indexOf(el) === -1) {
          parsed.addObject({
            val: el,
            selected: true
          });
        }
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
      this.set('selected',this.$('select').val());
      this._super(this.$('select').val());
    }
  }
});
