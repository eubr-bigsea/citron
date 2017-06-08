import FormComponent from 'lemonade-ember/lib/form-component';

export default FormComponent.extend({
  deltaValue: Ember.computed('currentValue', function() {
    return 100 - this.get('currentValue');
  })
});
