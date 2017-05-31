import FormComponent from 'lemonade-ember/lib/form-component';
import Ember from 'ember';

export default FormComponent.extend({
  init() {
    this._super(...arguments);

    this.set('parsedValues', Ember.A());

    let parsed = this.get('parsedValues');
    let values = JSON.parse(this.get('field.values'));

    this.get('currentValue').forEach((el) => {
      parsed.addObject({
        val: el,
        selected: true
      });
    });

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
  didInsertElement() {
    this.$('select').select2({
      tags: true,
      dropdownParent: this.$()
    });
  },
  actions: {
    valueChanged() {
      this._super(this.$('select').val());
    }
  }
});
