import jsep from '@jsep';
import FormComponent from 'citron/lib/form-component';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import { set } from '@ember/object';
import { copy } from '@ember/object/internals';

export default FormComponent.extend({
  classNameBindings: ['error'],
  error: computed('field.error', function(){ return this.get('field.error') }),
  expressionModal: false,

  init() {
    this._super(...arguments);

    let currentValue = A(this.get('currentValue'));
    this.set('parsedValues', copy(currentValue, true));
  },

  actions: {
    addRow(){
      this.get('parsedValues').addObject({ expression: null, error: null, alias: null, tree: null });
    },
    removeRow(row){
      this.get('parsedValues').removeObject(row);
    },
    showModal() {
      let currentValue = A(this.get('currentValue'));
      console.log(currentValue);
      this.set('parsedValues', copy(currentValue, true));
      this.set('expressionModal', true);
    },
    parseExpression(value) {
      set(value, 'error', null);
      try {
        let tree = jsep(value.expression);
        set(value, 'tree', tree);
      } catch (e) {
        set(value, 'error', e);
      }
    },
    valueChanged() {
      this._super(this.get('parsedValues'));
      this.set('expressionModal', false);
    }
  }
});
