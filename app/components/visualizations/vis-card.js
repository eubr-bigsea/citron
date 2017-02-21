import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
  },

  didInsertElement: function() {
    $("[data-toggle=tooltip]").tooltip();
  },
});
