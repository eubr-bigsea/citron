import Ember from 'ember';
import Ps from 'npm:perfect-scrollbar';

export default Ember.Component.extend({
  classNames: ['operation', 'sidebar', 'wrapper'],
  didInsertElement() {
    Ps.initialize(document.getElementById("operations-list"));
    Ember.$('#categories-list').metisMenu();
  },

  actions: {
    toggleSidebar(){
      Ember.$("#page-content-wrapper").toggleClass('toggled');
    }
  },
});
