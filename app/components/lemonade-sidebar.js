import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    $("#sidebar-menu").metisMenu();
  }
});
