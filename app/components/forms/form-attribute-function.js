import { A } from '@ember/array';
import FormComponent from 'lemonade-ember/lib/form-component';
import $ from 'jquery';

export default FormComponent.extend({
  modalVisible: false,
  isSort: false,


  didInsertElement(){
    this._super(...arguments);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('suggestedAttrsArray', A());
    this.set('parsedValues', JSON.parse(this.get('field.values')).functions);
    this.set('options', JSON.parse(this.get('field.values')).options);

    let suggestedParsed =  this.get('suggestedAttrsArray');
    let suggestedAttrs = this.get('field.suggestedAttrs');
    let currentValue = this.get('currentValue');
    if(!currentValue){ this.set('currentValue', A()); }
    if( this.get('field.name') === "attributes"){ this.set('isSort', true); }

    if(currentValue) {
      currentValue.forEach((el) => {
        suggestedParsed.addObject({
          val: el.attribute,
          selected: true
        });
      });
    }



    if(suggestedAttrs) {
      suggestedAttrs.forEach((el) => {
        if(suggestedParsed.findBy('val', el) === undefined) {
          suggestedParsed.addObject({
            val: el,
            selected: false
          });
        }
      });
    }


  },
  didRender(){
    $('select.attr').select2({
      tags: true,
    });
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
