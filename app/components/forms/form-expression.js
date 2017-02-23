/* global jsep */
import Ember from 'ember';

export default Ember.Component.extend({
  modalId: null,
  parsedValues: null,
  init() {
    this._super(...arguments);

    this.set('parsedValues', JSON.parse(this.get('field.values')));
  },
  didInsertElement() {
    this.set('modalId', this.get('elementId') + '_modal');

    var el = Ember.$(`#${this.get('elementId')} .modal`);

    el.attr('id', this.get('modalId'));
    el.appendTo('body');
  },
  willDestroyElement() {
    Ember.$('#' + this.get('modalId')).remove();
  },
  actions: {
    showModal() {
      Ember.$("#" + this.get('modalId')).modal();
    },
    parseExpression() {
      let el = Ember.$("#" + this.get('modalId') + " #resultExpression");

      try {
        var expr = jsep(Ember.$("#" + this.get('modalId') + " .typeExpression").val());
        el.addClass("alert-info");
        el.removeClass("alert-danger");
        el.text(JSON.stringify(expr));
      } catch (e) {
        el.addClass("alert-danger");
        el.removeClass("alert-info");
        el.text(e.message);
      }
    }
  }
});
