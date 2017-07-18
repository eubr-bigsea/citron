import jsep from 'npm:jsep';
import Ember from 'ember';
import FormComponent from 'lemonade-ember/lib/form-component';

export default FormComponent.extend({
  init() {
    this._super(...arguments);

    this.set('currentValue', JSON.parse(this.get('currentValue')));
    this.set('expression', this.get('currentValue.expression'));
    this.set('tree', JSON.stringify(this.get('currentValue.tree')));
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
      let expr = Ember.$('#typeExpression').val();
      this.set('currentValue', { expression: expr, tree: jsep(expr) });
      this._super(JSON.stringify(this.get('currentValue')));
      this.set('modalVisible', false);
    }
  }
});
