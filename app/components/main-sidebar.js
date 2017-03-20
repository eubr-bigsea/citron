import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    show(){
      $("#main-wrapper").addClass("toggled");
    },
    hide(){
      $("#main-wrapper").removeClass("toggled");
    },
  },
});
