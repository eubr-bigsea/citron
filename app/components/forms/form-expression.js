import jsep from 'npm:jsep';
import Ember from 'ember';
import FormComponent from 'lemonade-ember/lib/form-component';

export default FormComponent.extend({
  init() {
    this._super(...arguments);

    this.set('modalVisible', false);
    this.set('parsedValues', JSON.parse(this.get('field.values')));
  },
  actions: {
    showModal() {
      this.set('modalVisible', true);
    },
    hideModal() {
      this.set('modalVisible', false);

      /* We don't want to destroy the modal, just hide it */
      return false;
    },
    parseExpression() {
      let el = Ember.$('#resultExpression');
      let exprVal = Ember.$('#typeExpression').val();

      try {
        var expr = jsep(exprVal);
        el.addClass('alert-info');
        el.removeClass('alert-danger');
        el.text(JSON.stringify(expr));
        Ember.$("#okButton").removeAttr('disabled');
      } catch (e) {
        el.addClass('alert-danger');
        el.removeClass('alert-info');
        el.text(e.message);
        Ember.$("#okButton").attr('disabled', 'disabled');
      }
    },
    valueChanged() {
      this._super(Ember.$('#typeExpression').val());
      this.set('modalVisible', false);
    }
  }
});
