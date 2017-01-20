import Ember from 'ember';

export default Ember.Component.extend({
  sortBy: ['updated_at:desc'],
  sortedModel: Ember.computed.sort('jobs', 'sortBy'),
  willRender(){
    this.set('slicedModel', this.get('sortedModel').slice(0,5));
  },
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

