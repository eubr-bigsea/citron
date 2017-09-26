import FormComponent from 'lemonade-ember/lib/form-component';
import config from '../../config/environment';
import Ember from 'ember';

export default FormComponent.extend({
  init() {
    this._super(...arguments);

    if (this.get('field.values_url')) {
      var LIMONERO_URL = config.limonero; //don't delete this var, needed in next eval
      LIMONERO_URL;
      Ember.$.ajax({
        type: 'GET',
        url: eval(this.get('field.values_url'))
      }).then((response) => {
        this.set('parsedValues', response.map((v) => {
          return { "key": String(v.id), "value": v.name };
        }));
      });
    }
  }
});
