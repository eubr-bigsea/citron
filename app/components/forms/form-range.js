import FormComponent from 'lemonade-ember/lib/form-component';
import Ember from 'ember';

export default FormComponent.extend({
  deltaValue: Ember.computed('currentValue', function() {
    return 100 - this.get('currentValue');
  })
});
