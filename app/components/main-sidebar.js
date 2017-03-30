import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    this.$().hover(function() {$("#main-wrapper").toggleClass('toggled')});
  },

  actions: {
    show(){ $("#main-wrapper").addClass("toggled"); },
    hide(){ $("#main-wrapper").removeClass("toggled"); },
  },
});
