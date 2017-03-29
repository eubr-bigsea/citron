import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    this.$().hover(function() {$("#main-wrapper").toggleClass('toggled')});
  },

  actions: {
    show(){
      console.log('sho');
      $("#main-wrapper").addClass("toggled");
    },
    hide(){
      console.log('hide');
      $("#main-wrapper").removeClass("toggled");
    },
  },
});
