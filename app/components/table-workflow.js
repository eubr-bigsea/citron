import Ember from 'ember';

export default Ember.Component.extend({

  sortBy: ['name'],
  sortedModel: Ember.computed.sort('workflows','sortBy'),

  actions: {
    changeSorter(sortProp){
      var sortOrder;
      var sortAtual = [sortProp + ":asc"];
      if(this.get('sortBy')[0] === sortAtual[0]){
        sortOrder = 'desc';
      } else {
        sortOrder = 'asc';
      }
      this.set('sortBy',[sortProp + ":" + sortOrder]);
    }
  }
});
