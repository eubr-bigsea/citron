import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    Ember.$('#workflow-sidebar').metisMenu();

    Ember.$('#sidebar-collapse-btn').on('click', (event) => {
      event.preventDefault();

      Ember.$("#app").toggleClass("sidebar-open");
    });

    Ember.$("#sidebar-overlay").on('click', () => {
      Ember.$("#app").removeClass("sidebar-open");
    });
  }
});
