import $ from 'jquery';
import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import pagedArray from 'ember-cli-pagination/computed/paged-array';

export default Component.extend({

  name: '',
  toDelete: '',
  store: service('store'),


  sortBy: ['name'],
  sortedModel: sort('filteredResults','sortBy'),
  filterText: '',
  show: false,

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
    if($("[rel=tooltip]").is(':focus')){
      $("[rel=tooltip]").tooltip({ placement: 'right'});
    }

    $('#submit').click(() =>{
      this.triggerAction({
        action:'search',
        target: this
      });
    });

    $('#input').on('keyup', () =>{
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
      this.set('filterText', $('#input').val().toString().toLowerCase());
      this.set('page', 1);
    },
    checked(){
      if($('#select-all-items').is(':checked')){
        $('.input-checkbox').prop("checked", false);
      } else {
        $('.input-checkbox').prop("checked", true);
      }
    }
  }
});
