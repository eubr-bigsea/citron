import $ from 'jquery';
import FormComponent from 'citron/lib/form-component';
import config from '../../config/environment';
import { run } from '@ember/runloop';
import { computed } from '@ember/object';

export default FormComponent.extend({
  classNameBindings: ['error'],
  error: computed('field.error', function(){ return this.get('field.error') }),

  init() {
    this._super(...arguments);
    this.set('loading', false);
    if (this.get('field.values_url')) {
      this.set('loading', true);
      var LIMONERO_URL = config.limonero; //don't delete this var, needed in next eval
      LIMONERO_URL;
      $.ajax({
        type: 'GET',
        url: eval(this.get('field.values_url'))
      }).then(
        (response) => {
          this.set('loading', false);
          run(() =>{
            this.set('parsedValues', response.map((v) => {
              return { "key": String(v.id), "value": v.name };
            }));
          });
        }
      );
    }
  }
});
