import FormComponent from 'citron/lib/form-component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default FormComponent.extend({
  classNameBindings: ['error'],
  error: computed('field.error', function(){ return this.get('field.error') }),
  i18n: service(),

  didReceiveAttrs() {
    this._super(...arguments);
    let currentValue = this.get('currentValue');
    if(!currentValue){
      this.set('currentValue', this.get('field.default'));
    }
    var values = JSON.parse(this.get('field.values')).map( (el) => {
      const currentLocale = this.get('i18n.locale');
      if(currentLocale in el) {
        return {key: String(el.key), value: el[currentLocale] }
      } else {
        return {key: String(el.key), value: el.value }
      }
    })
    this.set('parsedValues', values);
  }
});
