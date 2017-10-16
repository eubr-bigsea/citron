import $ from 'jquery';
import jsep from 'npm:jsep';
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
      let el = $('#resultExpression');
      let exprVal = $('#typeExpression').val();

      try {
        var expr = jsep(exprVal);
        el.addClass('alert-info');
        el.removeClass('alert-danger');
        el.text(JSON.stringify(expr));
        $("#okButton").removeAttr('disabled');
      } catch (e) {
        el.addClass('alert-danger');
        el.removeClass('alert-info');
        el.text(e.message);
        $("#okButton").attr('disabled', 'disabled');
      }
    },
    valueChanged() {
      let expr = $('#typeExpression').val();
      this.set('currentValue', { expression: expr, tree: jsep(expr) });
      this._super(JSON.stringify(this.get('currentValue')));
      this.set('modalVisible', false);
    }
  }
});
