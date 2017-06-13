import Ember from 'ember';
import FormComponent from 'lemonade-ember/lib/form-component';

export default FormComponent.extend({
  init() {
    this._super(...arguments);

    this.set('modalVisible', false);
    this.set('parsedValues', JSON.parse(this.get('field.values')));

    if(this.get('currentValue') === null)
      this.set('currentValue', Ember.A());

  },
  actions: {
    addRow() {
      this.get('currentValue').addObject({attribute: null, f: null, alias: null});
    },
    moveRow(i, delta) {
      if(i + delta < 0 || i + delta >= this.get('currentValue').length)
        return;

      let row = this.get('currentValue')[i];
      this.get('currentValue').removeAt(i);
      this.get('currentValue').insertAt(i + delta, row);
    },
    removeRow(i) {
      this.get('currentValue').removeAt(i);
    },
    showModal() {
      this.set('modalVisible', true);
    },
    hideModal() {
      this.set('modalVisible', false);

      /* We don't want to destroy the modal, just hide it */
      return false;
    },
    valueChanged() {
      this._super(this.get('currentValue'));
      this.set('modalVisible', false);
    }
  }
});
