import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['item', 'item-list-header', 'hidden-sm-down'],
  tagName: 'li',

  sortBy: ['name'],
  sortedModel: Ember.computed.sort('workflows','sortBy'),

  actions: {
    changeSorter(sortProp){
      var sortAtual = sortProp + ":asc";
      if(this.get('sortBy') == sortAtual){
        var sortOrder = 'desc';
      } else {
        var sortOrder = 'asc';
      }
      this.set('sortBy',[sortProp + ":" + sortOrder]);
    }

  }
});
