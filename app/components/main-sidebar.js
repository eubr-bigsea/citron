import Component from '@ember/component';

export default Component.extend({
  didInsertElement() {
    this.$().hover(function() {$("#main-wrapper").toggleClass('toggled')});
  },

  actions: {
    show(){ $("#main-wrapper").addClass("toggled"); },
    hide(){ $("#main-wrapper").removeClass("toggled"); },
  },
});
