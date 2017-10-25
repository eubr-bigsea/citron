/*global window*/
/*global event*/
import { scheduleOnce } from '@ember/runloop';
import { htmlSafe } from '@ember/string';
import { A } from '@ember/array';
import { computed, observer } from '@ember/object';
import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  session: service(),

  init() {
    this._super(...arguments);
  },

  // Computed data
  cData: computed('data', function() { return this.get('data') == null ? A() : this.get('data'); }),

  // General Attributes
  isEmpty: computed('filteredData', function() { return this.get('filteredData') == null ? true : this.get('filteredData').length === 0; }),
  paddingTop: computed('cHeight', function() { return isNaN(this.get('cHeight')) ? 10 : this.get('cHeight') * 0.24; }),

  // Sorting attrs
  sortedData: computed('sortBy', 'sortOrder','cData', function() {
    var data = this.get('cData');
    var sortBy = this.get('sortBy');
    var sortOrder = this.get('sortOrder');

    return data.data.rows.sort((a,b) => d3[`${sortOrder}ending`](a[sortBy], b[sortBy]));
  }),
  sortBy: '0',
  sortOrder: 'asc',

  // Search attrs
  filteredData: computed('searchIndex','sortedData', function() {
    var data = this.get('sortedData');
    var search = this.get('search');
    return data.filter( a => search.length < 1 || a.filter( d => d.toString().indexOf(search) >= 0).length > 0 );
  }),
  search: "",
  searchIndex: 0,

  header: computed('cData', function() {
    var data = this.get('cData');
    return data.data.attributes;
  }),

  // Set my style for component
  myStyle: computed('cHeight', function(){ return htmlSafe(`height: ${this.get('cHeight')}px;`); }),
  myTableStyle: computed('cHeight', function(){ return htmlSafe(`max-height: ${this.get('cHeight') - 40}px;`); }),
  cHeight: computed('offsetTop','height', function() {
    return this.get('height') === 0 ? ($(window).outerHeight() - this.get('offsetTop'))*0.4926 : this.get('height');
  }),

  // After search / order
  searchChanged: observer('searchIndex', 'sortBy','sortOrder', function() {
    scheduleOnce('afterRender', this, 'draw', 'none');
  }),

  actions: {

    // Update search field
    updateSearch: function() {
      this.set('search', this.$("input[data-action='search']").val());
      if (event.keyCode === 13) { this.incrementProperty('searchIndex'); }
    },

    // Submit search field
    submitSearch: function() {
      this.incrementProperty('searchIndex');
    },

    // Sort table
    sortTable: function(sortBy) {

      if(this.get('sortBy') === `${sortBy}`) { this.set('sortOrder', this.get('sortOrder') === 'asc' ? 'desc' : 'asc'); }
      else {
        this.set('sortBy', `${sortBy}`);
        this.set('sortOrder', 'asc');
      }

    }

  }

});
