import Ember from 'ember';
import FormComponent from 'lemonade-ember/lib/form-component';

export default FormComponent.extend({
  init() {
    this._super(...arguments);

    this.set('modalVisible', false);
    this.set('parsedValues', JSON.parse(this.get('field.values')).functions);
    this.set('options', JSON.parse(this.get('field.values')).options);

    this.set('isAgg', this.get('options.show_alias'));
    this.set('isFilter', !this.get('isAgg') && this.get('options.show_value'));
    this.set('isSort', !this.get('isAgg') && !this.get('isFilter'));

    if(this.get('currentValue') === null)
      this.set('currentValue', Ember.A());

    if(this.get('isAgg')) {
      this.set('title', 'Aggregate operation');
      this.set('subtitle', '');
      this.set('column', 'Alias')
    } else {
      if(this.get('isFilter')) {
        this.set('title', 'Filter');
        this.set('subtitle', '');
        this.set('column', 'Value')
      } else {
        this.set('title', 'Sort');
        this.set('subtitle', '');
        this.set('column', '')
      }
    }
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
