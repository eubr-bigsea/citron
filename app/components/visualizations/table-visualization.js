import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  session: service(),

  init() {
    this._super(...arguments);
  },

  // Computed data
  cData: Ember.computed('data', function() { return this.get('data') == null ? Ember.A() : this.get('data'); }),

  // General Attributes
  isEmpty: Ember.computed('filteredData', function() { return this.get('filteredData') == null ? true : this.get('filteredData').length === 0; }),
  paddingTop: Ember.computed('cHeight', function() { return isNaN(this.get('cHeight')) ? 10 : this.get('cHeight') * 0.24; }),

  // Sorting attrs
  sortedData: Ember.computed('sortBy', 'sortOrder','cData', function() {
    var data = this.get('cData');
    var sortBy = this.get('sortBy');
    var sortOrder = this.get('sortOrder');

    return data.data.rows.sort((a,b) => d3[`${sortOrder}ending`](a[sortBy], b[sortBy]));
  }),
  sortBy: '0',
  sortOrder: 'asc',

  // Search attrs
  filteredData: Ember.computed('searchIndex','sortedData', function() {
    var data = this.get('sortedData');
    var search = this.get('search');
    return data.filter( a => search.length < 1 || a.filter( d => d.toString().indexOf(search) >= 0).length > 0 );
  }),
  search: "",
  searchIndex: 0,

  header: Ember.computed('cData', function() {
    var data = this.get('cData');
    return data.data.attributes;
  }),

  // Set my style for component
  myStyle: Ember.computed('cHeight', function(){ return Ember.String.htmlSafe(`height: ${this.get('cHeight')}px;`); }),
  myTableStyle: Ember.computed('cHeight', function(){ return Ember.String.htmlSafe(`max-height: ${this.get('cHeight') - 40}px;`); }),
  cHeight: Ember.computed('offsetTop','height', function() {
    return this.get('height') === 0 ? ($(window).outerHeight() - this.get('offsetTop'))*0.4926 : this.get('height');
  }),

  // After search / order
  searchChanged: Ember.observer('searchIndex', 'sortBy','sortOrder', function() {
    Ember.run.scheduleOnce('afterRender', this, 'draw', 'none');
  }),

  draw: function() {

    let component = this;

    /*
    Ember.$.ajax({
      url: component.get('dataUrl'),
      type: "GET",
      data: {},
      beforeSend: (request) => {
        gViz.shared.helpers.loading.show();

        request.setRequestHeader('Authorization', `Token token=${component.get('session.data.authenticated.token')} email=${component.get('session.data.authenticated.email')}`);
        request.setRequestHeader('X-Auth-Token', '123456');
      },
      success: (data) => {
        component.set('title', data.title);
        component.set('header', data.data.attributes);
        component.set('data', data.data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        gViz.shared.helpers.loading.hide();
      },

    });
    */
  },

  didInsertElement: function(){
    this.draw();
  },

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
