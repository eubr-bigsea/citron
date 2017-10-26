import Component from '@ember/component';
import $ from 'jquery';

export default Component.extend({
  init() {
    this._super(...arguments);
  },

  didInsertElement: function() {
    $("[data-toggle=tooltip]").tooltip();
  },
});
