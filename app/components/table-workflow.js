import Ember from 'ember';
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Ember.Component.extend({

  sortBy: ['name'],
  sortedModel: Ember.computed.sort('filteredResults','sortBy'),
  filterText: '',

  filteredResults: function() {
    var filter = this.get('filterText').toString().toLowerCase();
    return this.get('workflows').filter(function(item){
      return item.get('name').toString().toLowerCase().indexOf(filter) !== -1;
    });
  }.property('filterText'),

  queryParams: ["page", "perPage"],
  page: 1,
  perPage: 8,

  pagedContent: pagedArray('sortedModel', 'page, perPage'),
  totalPages: "pagedContent.totalPages",

  didInsertElement(){

    Ember.$('#submit').click(() =>{
      this.triggerAction({
        action:'search',
        target: this
      });
    });

    Ember.$('#input').on('keyup', () =>{
      this.triggerAction({
        action:'search',
        target: this
      });
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
    search(){
      this.set('filterText', Ember.$('#input').val().toString().toLowerCase());
      this.set('page', 1);
    },
    checked(){
      if(Ember.$('#select-all-items').is(':checked')){
        Ember.$('.checkbox').prop("checked", false);
      } else {
        Ember.$('.checkbox').prop("checked", true);
      }
    }
  }
});
