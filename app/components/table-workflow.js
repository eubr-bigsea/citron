import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['item', 'item-list-header', 'hidden-sm-down'],
  tagName: 'li',

  sortBy: ['name'],
  sortedModel: Ember.computed.sort('filteredResults','sortBy'),
  filterText: '',

  filteredResults: function() {
    var filter = this.get('filterText').toString().toLowerCase();
    return this.get('workflows').filter(function(item){
      return item.get('name').toString().toLowerCase().indexOf(filter) !== -1;
    });
  }.property('filterText'),

  didInsertElement(){
    Ember.$('#submit').click(() =>{
      this.set('filterText', Ember.$('#input').val().toString().toLowerCase());
    });
  },

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
    },
  }
});
