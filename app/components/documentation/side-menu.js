import $ from 'jquery';
import { computed } from '@ember/object';
import Component from '@ember/component';
import Ps from '@perfect-scrollbar';

export default Component.extend({
  filterText: '',
  classNames: ['operation', 'sidebar', 'wrapper'],

  filteredResults: computed('filterText', function() {
    var filter = this.get('filterText').toString().toLowerCase();
    return this.get('operations').filter(function(item){
      return item.get('name').toString().toLowerCase().indexOf(filter) !== -1;
    });
  }),

  didInsertElement() {
    new Ps("#operations-list");
    $('#categories-list').metisMenu();
  },

  didRender(){
    if(this.get('filterText') === ''){
      $('#categories-list').metisMenu('dispose');
      $('#categories-list').metisMenu();
    }
  },

  actions: {
    setOperation(slug){
      this.get('setPageSlug')(slug);
    },
    toggleSidebar(){
      $("#page-content-wrapper").toggleClass('toggled');
    },
  },
});
