import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['operation', 'sidebar', 'wrapper'],
  didInsertElement() {
    Ember.$('#categories-list').metisMenu();
  },

  actions: {
    toggleSidebar(){
      Ember.$("#page-content-wrapper").toggleClass('toggled');
    }
  },
});
