import Ember from 'ember';
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Ember.Component.extend({
  sortBy: ['updated_at:desc'],
  sortedModel: Ember.computed.sort('model', 'sortBy'),

  queryParams: ["page", "perPage"],
  page: 1,
  perPage: 8,

  pagedContent: pagedArray('sortedModel', 'page, perPage'),
  totalPages: "pagedContent.totalPages",

  actions: {
    changeSorter(sortProp){
      var sortOrder;
      if(this.get('sortBy')[0] === [`${sortProp}:asc`]){ sortOrder = 'desc'; }
      else { sortOrder = 'asc'; }
      this.set('sortBy',[`${sortProp}:${sortOrder}`]);
      this.set('slicedModel', this.get('sortedModel').slice(0,5));
    },
  }
});
