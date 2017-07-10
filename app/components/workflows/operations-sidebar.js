import Ember from 'ember';
import Ps from 'npm:perfect-scrollbar';

export default Ember.Component.extend({
  filterText: '',
  classNames: ['operation', 'sidebar', 'wrapper'],

  filteredResults: Ember.computed('filterText', function() {
    var filter = this.get('filterText').toString().toLowerCase();
    return this.get('operations').filter(function(item){
      return item.get('name').toString().toLowerCase().indexOf(filter) !== -1;
    });
  }),

  didInsertElement() {
    Ps.initialize(document.getElementById("operations-list"));
    Ember.$('#categories-list').metisMenu();
  },

  didRender(){
    if(this.get('filterText') === ''){
      Ember.$('#categories-list').metisMenu('dispose');
      Ember.$('#categories-list').metisMenu();
    }
  },

  actions: {
    toggleSidebar(){
      Ember.$("#page-content-wrapper").toggleClass('toggled');
    },
  },
});
