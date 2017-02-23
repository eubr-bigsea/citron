import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    Ember.$('#workflow-sidebar').metisMenu();
    Ember.$('#open-menu').unbind('click').on('click', (event) => {
      event.preventDefault();
      Ember.$('#open-menu').toggleClass('fa-angle-right fa-angle-left');
      Ember.$("#app").toggleClass("sidebar-open");
    });
    Ember.$("#sidebar-overlay").unbind('click').on('click', () => {
      Ember.$("#app").removeClass("sidebar-open");
    });
  }
});
